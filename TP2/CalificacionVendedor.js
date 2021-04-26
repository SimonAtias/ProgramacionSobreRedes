"use strict";
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
    CalificacionVendedor.query = "";
    return CalificacionVendedor;
}());
exports.CalificacionVendedor = CalificacionVendedor;
