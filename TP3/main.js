var cluster = require('cluster');
var process = require('process');
var bodyParser = require("body-parser");
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "donaciones"
});
if (cluster.isWorker) {
    process.on('message', function (msg) {
        console.log(msg);
        let reservas = 0;
        pool.getConnection(function(err, con){
            con.query("SELECT COUNT(*) FROM reservas WHERE usuario = " + msg.usuario + " AND funcion = " + msg.funcion, function(error, results, fields) {
                if (error) throw error;
                reservas = results[0].reservas;
            } 
        });
        process.send(msg);
        process.kill(process.pid);
    });
}
else {
    var express = require('express');
    var app = express();
    var port_1 = 3000;
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.post('/reservar', function (req, res) {
        var worker = cluster.fork();
        worker.send(req.body);
        console.log(req.body.funcion);
        console.log(req.body.usuario);
        console.log(req.body.butacas_reservadas.get[0]);
        worker.on('message', function (result) {
            res.status(200).json(result);
        });
    });
    app.get('/funciones', function (req, res) {
        var worker = cluster.fork();
        worker.send('hola, pa');
    });
    app.listen(port_1, function () {
        console.log("Example app listening at http://localhost:" + port_1);
    });
}
