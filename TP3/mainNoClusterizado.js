var cluster = require('cluster');
var bodyParser = require("body-parser");
var CronJob = require('cron').CronJob;
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    port: "3306",
    user: "root",
    password: "1234",
    database: "cine"
});
var job = new CronJob('0 */5 * * * *', function () {
    var d = new Date();
    pool.getConnection(function (err, con) {
        con.beginTransaction(function (err) {
            con.query('update funciones set vigente = 0 where timediff(curtime(), fecha) < 1;');
        });
    });
});
job.start();
var express = require('express');
var app = express();
var port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/funciones', function (req, res) {
    pool.getConnection(function (err, con) {
        con.query("select * from funciones where (vigente = 1)", function (err, result, fields) {
            con.release();
            res.json(result);
        });
    });
});
app.post('/reservar/:idFuncion', function (req, res) {
    var msg = ["reservar", req.params.idFuncion, req.body.usuario, req.body.butacas_reservadas];
    pool.getConnection(function (err, con) {
        con.beginTransaction(function (err) {
            con.query('select vigente from funciones where id=' + msg[1], function (err, result, fields) {
                if (result[0].vigente == 0) {
                    con.release();
                    res.json("La Funcion no esta disponible");
                }
            });
            con.query('select id from reservas where usuario = ' + msg[2] + ' and funcion = ' + msg[1] + '', function (err, result, fields) {
                if (result[0] != null) {
                    con.release();
                    res.json("Ya tenes una reserva en esta funcion");
                }
            });
            if (msg[3].length > 6) {
                con.release();
                res.json("No podes reservar mas de 6 butacas");
            }
            con.query("insert into reservas values (null,\"" + msg[2] + "\", \"" + msg[1] + "\",'" + JSON.stringify(msg[3]) + "')");
            con.query('select butacas_disponibles from funciones where id = ' + msg[1] + '', function (err, result, fields) {
                var butacas = JSON.parse(result[0].butacas_disponibles);
                var butacasAReservar = msg[3];
                for (var i = 0; i <= butacas.length; i++) {
                    for (var x = 0; x <= butacasAReservar.length; x++) {
                        if (butacas[i] == butacasAReservar[x]) {
                            butacas.splice(i, 1);
                        }
                    }
                }
                con.query("update funciones set butacas_disponibles = '" + JSON.stringify(butacas) + "' where id=" + msg[1]);
                con.commit(function (err) {
                    if (err) {
                        return con.rollback(function () {
                            throw err;
                        });
                    }
                    else {
                        con.release();
                        res.json("Reservado");
                    }
                });
            });
        });
    });
    ;
});
app.post('/cancelar/:idFuncion', function (req, res) {
    var msg = ["cancelar", req.params.idFuncion, req.body.usuario];
    pool.getConnection(function (err, con) {
        con.beginTransaction(function (err) {
            con.query('select id from reservas where funcion =' + msg[1] + ' and usuario=' + msg[2], function (err, result) {
                if (!result) {
                    con.release();
                    res.json("No existe esa reserva");
                }
            });
            con.query('select fecha from funciones where id =' + msg[1], function (err, result) {
                var fecha = result[0].fecha;
                var diff = (new Date(fecha).getTime() - Date.now()) / 36e5;
                if (diff < 1) {
                    con.release();
                    res.json("No podes cancelar con menos de una hora de anticipacion");
                }
            });
            con.query('select butacas_reservadas from reservas where funcion =' + msg[1] + ' and usuario=' + msg[2], function (err, result) {
                var butacasAgregar = JSON.parse(result[0].butacas_reservadas);
                con.query('select butacas_disponibles from funciones where id=' + msg[1], function (err, result) {
                    var butacasDisponibles = JSON.parse(result[0].butacas_disponibles);
                    butacasDisponibles = butacasDisponibles.concat(butacasAgregar);
                    con.query('update funciones set butacas_disponibles = ' + JSON.stringify(butacasDisponibles) + ' where id = ' + msg[1]);
                });
            });
            con.query('delete from reservas where funcion =' + msg[1] + ' and usuario=' + msg[2]);
            con.commit(function (err) {
                if (err) {
                    return con.rollback(function () {
                        throw err;
                    });
                }
            });
        });
    });
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
