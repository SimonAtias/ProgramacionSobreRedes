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
exports.Producto = void 0;
var Producto = /** @class */ (function () {
    function Producto(id, vendedor, nombre, precio, stock, usado) {
        this.id = id;
        this.id_vendedor = vendedor;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.usado = usado;
    }
    Producto.prototype.getId = function () {
        return this.id;
    };
    Producto.prototype.setId = function (id) {
        this.id = id;
    };
    Producto.prototype.getVendedor = function () {
        return this.id_vendedor;
    };
    Producto.prototype.setVendedor = function (vendedor) {
        this.id_vendedor = vendedor;
    };
    Producto.prototype.getNombre = function () {
        return this.nombre;
    };
    Producto.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Producto.prototype.getPrecio = function () {
        return this.precio;
    };
    Producto.prototype.setPrecio = function (precio) {
        this.precio = precio;
    };
    Producto.prototype.getStock = function () {
        return this.stock;
    };
    Producto.prototype.setStock = function (stock) {
        this.stock = stock;
    };
    Producto.prototype.isUsado = function () {
        return this.usado;
    };
    Producto.prototype.setUsado = function (usado) {
        this.usado = usado;
    };
    Producto.find = function (connection, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        connection.query('SELECT * FROM productos where id=' + id, function (error, results) {
                            if (error)
                                reject(error);
                            var producto = new Producto(results[0].id, results[0].vendedor, results[0].nombre, results[0].precio, results[0].stock, results[0].usado);
                            resolve(producto);
                        });
                    })];
            });
        });
    };
    Producto.prototype.save = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'UPDATE productos SET id=' + this.getId() + ', vendedor=' + this.getVendedor() + ', nombre= "' + this.getNombre() + '", precio=' + this.getPrecio() + ', stock=' + this.getStock() + ', usado=' + this.isUsado() + ' where id=' + this.getId() + ';';
                        return [4 /*yield*/, connection.query(query, function (error, results) {
                                if (error) {
                                    throw error;
                                }
                                return;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Producto.where = function (comparaX, comparador, cant) {
        if (Producto.query == "") {
            Producto.query = "SELECT * FROM productos WHERE 1";
        }
        if (cant == null) {
            return this;
        }
        Producto.query = Producto.query.concat(' AND ' + comparaX + ' ' + comparador + ' ' + cant + ' ');
        return this;
    };
    Producto.orderBy = function (ordenaX, ordena) {
        if (ordenaX == null) {
            return this;
        }
        Producto.query = Producto.query.concat(' ORDER BY ' + ordenaX + ' ' + ordena);
        return this;
    };
    Producto.get = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        connection.query(Producto.query, function (error, results) {
                            if (error)
                                reject(error);
                            var productos = new Array();
                            results.forEach(function (element) {
                                productos.push(new Producto(element.id, element.vendedor, element.nombre, element.precio, element.stock, element.usado));
                            });
                            Producto.query = "";
                            resolve(productos);
                        });
                    })];
            });
        });
    };
    Producto.query = "";
    return Producto;
}());
exports.Producto = Producto;
