"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalificacionComprador = void 0;
var CalificacionComprador = /** @class */ (function () {
    function CalificacionComprador(id, id_comprador, id_vendedor, calificacion, fecha) {
        this.id = id;
        this.id_comprador = id_comprador;
        this.id_vendedor = id_vendedor;
        this.calificacion = calificacion;
        this.fecha = fecha;
    }
    CalificacionComprador.prototype.getId = function () {
        return this.id;
    };
    CalificacionComprador.prototype.setId = function (id) {
        this.id = id;
    };
    CalificacionComprador.prototype.getId_comprador = function () {
        return this.id_comprador;
    };
    CalificacionComprador.prototype.setId_comprador = function (id_comprador) {
        this.id_comprador = id_comprador;
    };
    CalificacionComprador.prototype.getId_vendedor = function () {
        return this.id_vendedor;
    };
    CalificacionComprador.prototype.setId_vendedor = function (id_vendedor) {
        this.id_vendedor = id_vendedor;
    };
    CalificacionComprador.prototype.getCalificacion = function () {
        return this.calificacion;
    };
    CalificacionComprador.prototype.setCalificacion = function (calificacion) {
        this.calificacion = calificacion;
    };
    CalificacionComprador.query = "";
    return CalificacionComprador;
}());
exports.CalificacionComprador = CalificacionComprador;
