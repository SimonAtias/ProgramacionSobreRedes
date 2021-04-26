"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Producto_1 = require("./Producto");
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
app.get('/productos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                /* let productos = await Producto.where('precio','<','1000').get(connection);
                console.log(productos); */
                /* let productoTest = new Producto(9,3,'Juego PS2 Resident Evil 4 Original',500,1,true);
                productoTest.save(connection); */
                _b = (_a = console).log;
                return [4 /*yield*/, Producto_1.Producto.find(connection, 1)];
            case 1:
                /* let productos = await Producto.where('precio','<','1000').get(connection);
                console.log(productos); */
                /* let productoTest = new Producto(9,3,'Juego PS2 Resident Evil 4 Original',500,1,true);
                productoTest.save(connection); */
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
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
app.delete('/usuarios/:id_usuario/fav', function (req, res) {
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
