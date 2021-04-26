"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compras = void 0;
var Compras = /** @class */ (function () {
    function Compras(id, id_producto, cantidad, fecha, compradorCalificado, vendedorCalificado) {
        this.id = id;
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
    Compras.query = "";
    return Compras;
}());
exports.Compras = Compras;
