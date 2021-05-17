const cluster = require('cluster');
const process = require('process');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"ecommerce"
});

if(cluster.isWorker){

    process.on('message', (msg) => {
        if(msg=='hola, negry'){
            console.log(msg);
            process.kill(process.pid);
        }
        else if(msg=='hola, pa'){
            console.log(msg);
            process.kill(process.pid);
        }
    })

}
else{
    
    const express = require('express');
    const app = express();
    const port = 3000;
    
    app.get('/negry', (req, res) => {
        const worker = cluster.fork();
        worker.send('hola, negry');
    })

    app.get('/pa', (req, res) => {
        const worker = cluster.fork();
        worker.send('hola, pa');
    })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });

}




