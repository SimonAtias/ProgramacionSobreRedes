var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password : '1234',
    database :  'ecommerce'
})

connection.connect();

connection.query( 'SELECT vendedor FROM productos WHERE id = 9;', function (error, results, field){
    if (error) throw error;
    console.log('El vendedor es: ', results[0].vendedor);
});