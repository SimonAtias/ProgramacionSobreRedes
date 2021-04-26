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
exports.Favorito = void 0;
var Favorito = /** @class */ (function () {
    function Favorito(id, id_usuario, id_producto) {
        this.id = id;
        this.id_usuario = id_usuario;
        this.id_producto = id_producto;
    }
    Favorito.prototype.getId = function () {
        return this.id;
    };
    Favorito.prototype.setId = function (id) {
        this.id = id;
    };
    Favorito.prototype.getId_usuario = function () {
        return this.id_usuario;
    };
    Favorito.prototype.setId_usuario = function (id_usuario) {
        this.id_usuario = id_usuario;
    };
    Favorito.prototype.getId_producto = function () {
        return this.id_producto;
    };
    Favorito.prototype.setId_producto = function (id_producto) {
        this.id_producto = id_producto;
    };
    Favorito.find = function (connection, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        connection.query('SELECT * FROM favoritos where id=' + id, function (error, results) {
                            if (error)
                                reject(error);
                            var favoritos = new Favorito(results[0].id, results[0].id_usuario, results[0].id_producto);
                            resolve(favoritos);
                        });
                    })];
            });
        });
    };
    Favorito.prototype.save = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'UPDATE Favorito SET id=' + this.getId() + ', id_usuario=' + this.getId_usuario() + ', id_producto= "' + this.getId_producto() + ' where id= ' + this.getId() + ';';
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
    Favorito.where = function (comparaX, comparador, cant) {
        if (Favorito.query == "") {
            Favorito.query = "SELECT * FROM favoritos WHERE 1";
        }
        if (cant == null) {
            return this;
        }
        Favorito.query = Favorito.query.concat(' AND ' + comparaX + ' ' + comparador + ' ' + cant + ' ');
        return this;
    };
    Favorito.orderBy = function (ordenaX, ordena) {
        if (ordenaX == null) {
            return this;
        }
        Favorito.query = Favorito.query.concat(' ORDER BY ' + ordenaX + ' ' + ordena);
        return this;
    };
    Favorito.get = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        connection.query(Favorito.query, function (error, results) {
                            if (error)
                                reject(error);
                            var favoritos = new Array();
                            results.forEach(function (element) {
                                favoritos.push(new Favorito(element.id, element.id_usuario, element.id_producto));
                            });
                            Favorito.query = "";
                            resolve(favoritos);
                        });
                    })];
            });
        });
    };
    Favorito.query = "";
    return Favorito;
}());
exports.Favorito = Favorito;
