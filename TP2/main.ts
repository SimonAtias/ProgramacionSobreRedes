const express = require('express')
const app = express()
const port = 3000

var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password : '1234',
    database :  'ecommerce'
})

connection.connect();

/*app.get('/procuctos', (req, res) => {
    
    connection.query( 'SELECT * FROM ecommerce.productos WHERE nombre like "%PS2%";', function (error, results, field){
        if (error) throw error;
        return res.json(results);
    });

})*/

app.get('/users/:userId/books/:bookId', function(req, res){

    res.send(req.params);

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})







