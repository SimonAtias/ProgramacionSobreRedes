const cluster = require('cluster');
const bodyParser = require("body-parser");
const CronJob = require('cron').CronJob;

const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    port: "3306",
    user: "root",
    password: "1234",
    database: "cine"
});

const job = new CronJob('0 */5 * * * *', function() {
	const d = new Date();
	pool.getConnection(function(err,con){
        con.beginTransaction(function(err){ 
            con.query('update funciones set vigente = 0 where timediff(curtime(), fecha) < 1;');
        });
    });
});
job.start();

if(cluster.isWorker){
    process.on('message', (msg) => {
        if(msg=="Funciones"){
            pool.getConnection(function(err, con){
                con.query("select * from funciones where (vigente = 1)", function (err, result, fields) {
                    con.release();
                    process.send(result)
                    process.kill(process.pid);
                });
            });
        }else if(msg[0]=="reservar"){
            pool.getConnection(function(err, con){ 
                con.beginTransaction(function(err){ 
                    con.query('select vigente from funciones where id='+msg[1]), function (err, result, fields) {
                        if(result=0){
                            con.release();
                            process.send("La Funcion no esta disponible");
                            process.kill(process.pid); 
                        }
                    }
                    con.query('select id from reservas where usuario = 4 and funcion = 4'), function (err, result, fields) {
                        if(result != null){
                            con.release();
                            process.send("Ya tenes una reserva en esta funcion");
                            process.kill(process.pid); 
                        }
                    } 
                    if(!(msg[3].length < 7)){
                        con.release();
                        process.send("No podes reservar mas de 6 butacas");
                        process.kill(process.pid);
                    }
                    con.query('insert into reservas values(null,'+ msg[2] +','+ msg[1] +', '+ msg[3] +' )'); 
                    con.query('select butacas_disponibles from funciones where id = '+ msg[1] +'',function(err, result, fields){
                        let butacas = JSON.parse(result[0].butacas_disponibles);
                        let butacasAReservar = msg[3];
                        for(let i = 0; i <= butacas.length ; i ++){
                            for(let x = 0; x <= butacasAReservar.length ; x ++){
                                if(butacas[i]==butacasAReservar[x]){
                                    butacas.splice(i, 1);
                                }
                            }
                        }
                        con.query('update funciones set butacas_disponibles = '+JSON.stringify(butacas)+' where id='+msg[1]);
                    });
                    con.commit(function(err){
                        if(err){return con.rollback(function(){
                            throw err;
                        })}
                    })
                    con.release();
                    process.send("Reservado");
                    process.kill(process.pid);
                }); 
            }); 
        }else if(msg[0]="cancelar"){
            pool.getConnection(function(err, con){ 
                con.beginTransaction(function(err){ 
                    con.query('select id from reservas where funcion ='+msg[1]+' and usuario='+msg[2], function(err,result){
                        if(!result){
                            con.release();
                            process.send("No existe esa reserva");
                            process.kill(process.pid); 
                        }
                    });
                    con.query('select fecha from funciones where id =' +msg[1],function(err,result){
                        let fecha = result[0].fecha;
                        let diff = (new Date(fecha).getTime() - Date.now()) / 36e5
                        if(diff < 1){
                            con.release();
                            process.send("No podes cancelar con menos de una hora de anticipacion");
                            process.kill(process.pid); 
                        }
                    });
                    con.query('select butacas_reservadas from reservas where funcion ='+msg[1]+' and usuario='+msg[2], function(err,result){
                        let butacasAgregar = JSON.parse(result[0].butacas_reservadas);
                        con.query('select butacas_disponibles from funciones where id='+msg[1], function(err, result){
                            let butacasDisponibles = JSON.parse(result[0].butacas_disponibles);
                            butacasDisponibles = butacasDisponibles.concat(butacasAgregar);
                            con.query('update funciones set butacas_disponibles = ' + JSON.stringify(butacasDisponibles) + ' where id = ' + msg[1]);
                        });
                    })
                    con.query('delete from reservas where funcion ='+msg[1]+' and usuario='+msg[2]);
                    con.commit(function(err){
                        if(err){return con.rollback(function(){
                            throw err;
                        })}
                    })
                    con.release();
                    process.send("Reserva Cancelada");
                    process.kill(process.pid);
                }); 
            });
        }
    })

}

else{
    
    const express = require('express');
    const app = express();
    const port = 3000;
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    

    app.get('/funciones', (req, res) => {
        const worker = cluster.fork();
        worker.send("Funciones");
        worker.on('message', (result) =>{
            res.json(result)
        });
    })

    app.post('/reservar/:idFuncion', (req, res) => {
        const worker = cluster.fork();
        const data = ["reservar", req.params.idFuncion, req.body.usuario, req.body.butacas_reservadas];
        worker.send(data);
        worker.on('message', (result) => {
            res.json(result);
        })
    })

    app.post('/cancelar/:idFuncion', (req, res) => {
        const worker = cluster.fork();
        const data = ["cancelar", req.params.idFuncion, req.body.usuario];
        worker.send(data);
        worker.on('message', (result) => {
            res.json(result);
        })
    })

    

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });

}




