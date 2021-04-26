import { Compras } from "./Compras";
import { Producto } from "./Producto";

const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password : '1234',
    database :  'ecommerce'
});

app.get('/productos',async (req, res) => {
    let r = await Producto.where("nombre","like","'%"+req.query.busqueda+"%'").where("usado","=",req.query.usado).orderBy(req.query.orden,"DESC").get(connection);
    res.json(r);
});

app.get('/usuarios/:id_usuario/fav', (req, res) => {
    connection.query("SELECT productos.id, productos.vendedor, productos.nombre, productos.precio, productos.stock, productos.usado FROM ecommerce.favoritos INNER JOIN usuarios ON usuarios.id=favoritos.id_usuario INNER JOIN productos ON favoritos.id_producto=productos.id WHERE usuarios.id = "+req.params.id_usuario+";", function (error, results, field) {
        if (error)
            throw error;
        return res.json(results);
    });
});

app.post('/usuarios/:id_usuario/fav', (req, res) =>{
    connection.query("insert into favoritos values (null, "+req.params.id_usuario+", "+req.body.id_producto+");", function (error, results, field){
        if(error){
            throw error;
        }
        else{
            res.send('InsertadE');
        }
    })
})

app.delete('/usuarios/:id_usuario/fav', (req, res) =>{

    connection.query("DELETE FROM favoritos WHERE id_usuario = "+req.params.id_usuario+" AND id_producto = "+req.body.id_producto+";", function (error, results, field){
        if(error){
            throw error;
        }
        else{
            res.send('DeleteadE');
        }
    })
})

app.get('/usuarios/:id_usuario/compras', async(req, res) =>{

    let r = await Compras.where('id_Usuario','=',req.query.id_usuario).get(connection);
    return res.json(r);
})

app.post('/usuarios/:id_usuario/compras', (req, res) =>{

    connection.query("Insert into compras values (null, "+req.params.id_usuario+", "+req.body.id_producto+", "+req.body.cantidad+", NOW(), 0, 0);", function (error, results, field){
        if(error){
            throw error;
        }
        else{
            res.send('InsertadE');
        }
    })
})

app.get('/usuarios/:id_usuario/calificaciones', (req, res) =>{

    connection.query("SELECT id_comprador , id_vendedor AS 'vendedor', calificacion, fecha, 'compra' AS tipo_intercambio FROM calificaciones_compradores WHERE id_comprador = "+req.params.id_usuario+" UNION SELECT id_vendedor AS mi_id, id_comprador AS 'cliente/vendedo', calificacion, fecha, 'venta' AS tipo_intercambio FROM calificaciones_vendedores WHERE id_comprador = "+req.params.id_usuario+";", function (error, results, field){
        if(error){
            throw error;
        }
        else{
            return res.json(results);
        }
    })
})

app.post('/usuarios/:id_usuario/calificaciones', (req, res) =>{

    let id_operacion = req.body.id_operacion;
    let id_usuario = req.params.id_usuario;
    let id_calificante = req.body.id_calificante;
    let calificacion  = req.body.calificacion;

    console.log(id_operacion);
    console.log(id_usuario);
    console.log(id_calificante);
    console.log(calificacion);
    
    connection.query('SELECT id_usuario AS id_comprador, vendedor FROM compras INNER JOIN productos ON id_producto=productos.id WHERE compras.id = '+id_operacion+';', function (error, resultsQuery1, fields) {
        if (error) throw error;
        if(resultsQuery1[0].id_comprador==id_calificante){
            connection.query("Insert into calificaciones_compradores values (null, "+id_calificante+","+id_usuario+","+calificacion+", NOW());", function (error, results, field){
                if(error){
                    throw error;
                }
                else{
                    res.send('InsertadE');
                }
            })
        }
        else {
            connection.query("Insert into calificaciones_vendedores values (null, "+id_calificante+","+id_usuario+","+calificacion+", NOW());", function (error, results, field){
                if(error){
                    throw error;
                }
                else{
                    res.send('InsertadE');
                }
            })
        }
    });
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});