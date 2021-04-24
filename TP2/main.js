var express = require('express');
var app = express();
var port = 3000;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'ecommerce'
});
app.get('/productos', function (req, res) {
    var mi_query = new String("SELECT * FROM productos WHERE 1 ");
    if (req.query.busqueda != null) {
        mi_query = mi_query.concat(("AND nombre like '%" + req.query.busqueda + "%' ").toString());
    }
    if (req.query.usado != null) {
        mi_query = mi_query.concat(("AND usado = " + req.query.usado + " ").toString());
    }
    if (req.query.orden != null) {
        mi_query = mi_query.concat(("order by " + req.query.orden + ";").toString());
    }
    connection.query(mi_query, function (error, results, field) {
        if (error)
            throw error;
        return res.json(results);
    });
});
app.get('/usuarios/:id_usuario/fav', function (req, res) {
    connection.query("SELECT productos.id, productos.vendedor, productos.nombre, productos.precio, productos.stock, productos.usado FROM ecommerce.favoritos INNER JOIN usuarios ON usuarios.id=favoritos.id_usuario INNER JOIN productos ON favoritos.id_producto=productos.id WHERE usuarios.id = " + req.params.id_usuario + ";", function (error, results, field) {
        if (error)
            throw error;
        return res.json(results);
    });
});
app.post('/usuarios/:id_usuario/fav', function (req, res) {
    connection.query("insert into favoritos values (null, " + req.params.id_usuario + ", " + req.query.id_producto + ");", function (error, results, field) {
        if (error) {
            throw error;
        }
        else {
            res.send('InsertadE');
        }
    });
});
app["delete"]('/usuarios/:id_usuario/fav', function (req, res) {
    connection.query("DELETE FROM favoritos WHERE id_usuario = " + req.params.id_usuario + " AND id_producto = " + req.query.id_producto + ";", function (error, results, field) {
        if (error) {
            throw error;
        }
        else {
            res.send('DeleteadE');
        }
    });
});
app.get('/usuarios/:id_usuario/compras', function (req, res) {
    connection.query("SELECT * FROM compras WHERE id_usuario = " + req.params.id_usuario + ";", function (error, results, field) {
        if (error) {
            throw error;
        }
        else {
            return res.json(results);
        }
    });
});
app.post('/usuarios/:id_usuario/compras', function (req, res) {
    connection.query("Insert into compras values (null, " + req.params.id_usuario + ", " + req.query.id_producto + ", " + req.query.cantidad + ", NOW(), 0, 0);", function (error, results, field) {
        if (error) {
            throw error;
        }
        else {
            res.send('InsertadE');
        }
    });
});
app.get('/usuarios/:id_usuario/calificaciones', function (req, res) {
    connection.query("SELECT id_comprador , id_vendedor AS 'vendedor', calificacion, fecha, 'compra' AS tipo_intercambio FROM calificaciones_compradores WHERE id_comprador = " + req.params.id_usuario + " UNION SELECT id_vendedor AS mi_id, id_comprador AS 'cliente/vendedo', calificacion, fecha, 'venta' AS tipo_intercambio FROM calificaciones_vendedores WHERE id_comprador = " + req.params.id_usuario + ";", function (error, results, field) {
        if (error) {
            throw error;
        }
        else {
            return res.json(results);
        }
    });
});
app.post('/usuarios/:id_usuario/calificaciones', function (req, res) {
    var id_operacion = req.query.id_operacion;
    connection.query('SELECT id_usuario AS id_comprador, vendedor FROM compras INNER JOIN productos ON id_producto=productos.id WHERE compras.id = ' + id_operacion + ';', function (error, resultsQuery1, fields) {
        if (error)
            throw error;
        if (resultsQuery1[0].id_comprador == req.params.id_usuario) {
            connection.query("Insert into calificaciones_compradores values (null, " + req.params.id_usuario + "," + resultsQuery1[0].vendedor + "," + req.query.calificacion + ", NOW());", function (error, results, field) {
                if (error) {
                    throw error;
                }
                else {
                    res.send('InsertadE');
                }
            });
        }
        else {
            connection.query("Insert into calificaciones_vendedores values (null, " + req.params.id_usuario + "," + resultsQuery1[0].id_comprador + "," + req.query.calificacion + ", NOW());", function (error, results, field) {
                if (error) {
                    throw error;
                }
                else {
                    res.send('InsertadE');
                }
            });
        }
    });
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
