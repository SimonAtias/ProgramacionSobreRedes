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
exports.Compras = void 0;
var Compras = /** @class */ (function () {
    function Compras(id, id_usuario, id_producto, cantidad, fecha, compradorCalificado, vendedorCalificado) {
        this.id = id;
        this.id_usuario = id_usuario;
        this.id_producto = id_producto;
        this.cantidad = cantidad;
        this.fecha = fecha;
        this.compradorCalificado = compradorCalificado;
        this.vendedorCalificado = vendedorCalificado;
    }
    Compras.prototype.getId = function () {
        return this.id;
    };
    Compras.prototype.setId = function (id) {
        this.id = id;
    };
    Compras.prototype.getId_usuario = function () {
        return this.id_usuario;
    };
    Compras.prototype.setId_usuario = function (id_usuario) {
        this.id_usuario = id_usuario;
    };
    Compras.prototype.getId_producto = function () {
        return this.id_producto;
    };
    Compras.prototype.setId_producto = function (id_producto) {
        this.id_producto = id_producto;
    };
    Compras.prototype.getCantidad = function () {
        return this.cantidad;
    };
    Compras.prototype.setCantidad = function (cantidad) {
        this.cantidad = cantidad;
    };
    Compras.prototype.getFecha = function () {
        return this.fecha;
    };
    Compras.prototype.setFecha = function (fecha) {
        this.fecha = fecha;
    };
    Compras.prototype.isCompradorCalificado = function () {
        return this.compradorCalificado;
    };
    Compras.prototype.setCompradorCalificado = function (compradorCalificado) {
        this.compradorCalificado = compradorCalificado;
    };
    Compras.prototype.isVendedorCalificado = function () {
        return this.vendedorCalificado;
    };
    Compras.prototype.setVendedorCalificado = function (vendedorCalificado) {
        this.vendedorCalificado = vendedorCalificado;
    };
    Compras.find = function (connection, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        connection.query('SELECT * FROM compras where id=' + id, function (error, results) {
                            if (error)
                                reject(error);
                            var compras = new Compras(results[0].id, results[0].id_usuario, results[0].id_producto, results[0].cantidad, results[0].fecha, results[0].comprador_calificado, results[0].vendedor_calificado);
                            resolve(compras);
                        });
                    })];
            });
        });
    };
    Compras.prototype.save = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'UPDATE Compras SET id=' + this.getId() + ', id_usuario=' + this.getId_usuario() + ', id_producto= "' + this.getId_producto() + '", cantidad=' + this.getCantidad() + ', fecha=' + this.getFecha() + ', comprador_calificado=' + this.isCompradorCalificado() + ', vendedor_calificado=' + this.isVendedorCalificado() + ' where id= ' + this.getId() + ';';
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
    Compras.where = function (comparaX, comparador, cant) {
        if (Compras.query == "") {
            Compras.query = "SELECT * FROM compras WHERE 1";
        }
        if (cant == null) {
            return this;
        }
        Compras.query = Compras.query.concat(' AND ' + comparaX + ' ' + comparador + ' ' + cant + ' ');
        return this;
    };
    Compras.orderBy = function (ordenaX, ordena) {
        if (ordenaX == null) {
            return this;
        }
        Compras.query = Compras.query.concat(' ORDER BY ' + ordenaX + ' ' + ordena);
        return this;
    };
    Compras.get = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        connection.query(Compras.query, function (error, results) {
                            if (error)
                                reject(error);
                            var compras = new Array();
                            results.forEach(function (element) {
                                compras.push(new Compras(element.id, element.id_usuario, element.id_producto, element.cantidad, element.fecha, element.comprador_calificado, element.vendedor_calificado));
                            });
                            Compras.query = "";
                            resolve(compras);
                        });
                    })];
            });
        });
    };
    Compras.query = "";
    return Compras;
}());
exports.Compras = Compras;
