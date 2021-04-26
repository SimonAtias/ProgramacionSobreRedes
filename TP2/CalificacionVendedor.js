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
exports.CalificacionVendedor = void 0;
var CalificacionVendedor = /** @class */ (function () {
    function CalificacionVendedor(id, id_comprador, id_vendedor, calificacion, fecha) {
        this.id = id;
        this.id_comprador = id_comprador;
        this.id_vendedor = id_vendedor;
        this.calificacion = calificacion;
        this.fecha = fecha;
    }
    CalificacionVendedor.prototype.getId = function () {
        return this.id;
    };
    CalificacionVendedor.prototype.setId = function (id) {
        this.id = id;
    };
    CalificacionVendedor.prototype.getId_comprador = function () {
        return this.id_comprador;
    };
    CalificacionVendedor.prototype.setId_comprador = function (id_comprador) {
        this.id_comprador = id_comprador;
    };
    CalificacionVendedor.prototype.getId_vendedor = function () {
        return this.id_vendedor;
    };
    CalificacionVendedor.prototype.setId_vendedor = function (id_vendedor) {
        this.id_vendedor = id_vendedor;
    };
    CalificacionVendedor.prototype.getCalificacion = function () {
        return this.calificacion;
    };
    CalificacionVendedor.prototype.setCalificacion = function (calificacion) {
        this.calificacion = calificacion;
    };
    CalificacionVendedor.prototype.getFecha = function () {
        return this.fecha;
    };
    CalificacionVendedor.prototype.setFecha = function (fecha) {
        this.fecha = fecha;
    };
    CalificacionVendedor.find = function (connection, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        connection.query('SELECT * FROM calificaciones_vendedores where id=' + id, function (error, results) {
                            if (error)
                                reject(error);
                            var calificaciones_vendedores = new CalificacionVendedor(results[0].id, results[0].id_vendedor, results[0].id_comprador, results[0].calificacion, results[0].fecha);
                            resolve(calificaciones_vendedores);
                        });
                    })];
            });
        });
    };
    CalificacionVendedor.prototype.save = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'UPDATE Favorito SET id=' + this.getId() + ', id_vendedor=' + this.getId_vendedor() + ', id_comprador= "' + this.getId_comprador() + ', calificacion= "' + this.getCalificacion() + ', fecha= "' + this.getFecha() + ' where id= ' + this.getId() + ';';
                        console.log(query);
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
    CalificacionVendedor.where = function (comparaX, comparador, cant) {
        if (CalificacionVendedor.query == "") {
            CalificacionVendedor.query = "SELECT * FROM calificaciones_vendedores WHERE 1";
        }
        if (cant == null) {
            return this;
        }
        CalificacionVendedor.query = CalificacionVendedor.query.concat(' AND ' + comparaX + ' ' + comparador + ' ' + cant + ' ');
        return this;
    };
    CalificacionVendedor.orderBy = function (ordenaX, ordena) {
        if (ordenaX == null) {
            return this;
        }
        CalificacionVendedor.query = CalificacionVendedor.query.concat(' ORDER BY ' + ordenaX + ' ' + ordena);
        return this;
    };
    CalificacionVendedor.get = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        connection.query(CalificacionVendedor.query, function (error, results) {
                            if (error)
                                reject(error);
                            var calificaciones_vendedores = new Array();
                            results.forEach(function (element) {
                                calificaciones_vendedores.push(new CalificacionVendedor(element.id, element.id_vendedor, element.id_comprador, element.calificacion, element.fecha));
                            });
                            CalificacionVendedor.query = "";
                            resolve(calificaciones_vendedores);
                        });
                    })];
            });
        });
    };
    CalificacionVendedor.query = "";
    return CalificacionVendedor;
}());
exports.CalificacionVendedor = CalificacionVendedor;
