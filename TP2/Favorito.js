"use strict";
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
    Favorito.query = "";
    return Favorito;
}());
exports.Favorito = Favorito;
