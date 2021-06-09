const cluster = require('cluster');
const process = require('process');
const bodyParser = require("body-parser");


const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "donaciones"
});

if(cluster.isWorker){

    process.on('message', (msg) => {
        /*console.log(msg);
        pool.getConnection(function(err, con){
            con.query("SELECT COUNT(*) FROM reservas WHERE usuario = " msg.)
        })*/
        process.send(msg);
        process.kill(process.pid);
    })

}

else{
    
    const express = require('express');
    const app = express();
    const port = 3000;
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    app.post('/reservar', (req, res) => {
        const worker = cluster.fork();
        worker.send(req.body);
        console.log(req.body.funcion);
        console.log(req.body.usuario);
        console.log(req.body.butacas_reservadas.get[0]);
        worker.on('message', (result) => {
            res.status(200).json(result);
        })
    })

    app.get('/funciones', (req, res) => {
        const worker = cluster.fork();
        worker.send('hola, pa');
    })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });

}




