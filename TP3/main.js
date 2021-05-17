var cluster = require('cluster');
var process = require('process');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "ecommerce"
});
if (cluster.isWorker) {
    process.on('message', function (msg) {
        if (msg == 'hola, negry') {
            console.log(msg);
            process.kill(process.pid);
        }
        else if (msg == 'hola, pa') {
            console.log(msg);
            process.kill(process.pid);
        }
    });
}
else {
    var express = require('express');
    var app = express();
    var port_1 = 3000;
    app.get('/negry', function (req, res) {
        var worker = cluster.fork();
        worker.send('hola, negry');
    });
    app.get('/pa', function (req, res) {
        var worker = cluster.fork();
        worker.send('hola, pa');
    });
    app.listen(port_1, function () {
        console.log("Example app listening at http://localhost:" + port_1);
    });
}
