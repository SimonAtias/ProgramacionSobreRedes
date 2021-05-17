
const express = require('express')
const app = express()
const port = 3000

var mysql = require('mysql');
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"ecommerce"
});

app.get('/funciones', (req, res) => {

    

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
