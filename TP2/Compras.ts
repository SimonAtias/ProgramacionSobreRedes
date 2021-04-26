export class Compras{

    private id: number;
    private id_producto: number;
    private cantidad: number;
    private fecha: Date;
    private compradorCalificado: boolean;
    private vendedorCalificado: boolean;
    protected static query:string="";

    constructor(
        id: number, 
        id_producto: number, 
        cantidad: number, 
        fecha: Date, 
        compradorCalificado: boolean, 
        vendedorCalificado: boolean
    ) {
        this.id = id
        this.id_producto = id_producto
        this.cantidad = cantidad
        this.fecha = fecha
        this.compradorCalificado = compradorCalificado
        this.vendedorCalificado = vendedorCalificado
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getId_producto(): number {
        return this.id_producto;
    }

    public setId_producto(id_producto: number): void {
        this.id_producto = id_producto;
    }

    public getCantidad(): number {
        return this.cantidad;
    }

    public setCantidad(cantidad: number): void {
        this.cantidad = cantidad;
    }

    public getFecha(): Date {
        return this.fecha;
    }

    public setFecha(fecha: Date): void {
        this.fecha = fecha;
    }

    public isCompradorCalificado(): boolean {
        return this.compradorCalificado;
    }

    public setCompradorCalificado(compradorCalificado: boolean): void {
        this.compradorCalificado = compradorCalificado;
    }

    public isVendedorCalificado(): boolean {
        return this.vendedorCalificado;
    }

    public setVendedorCalificado(vendedorCalificado: boolean): void {
        this.vendedorCalificado = vendedorCalificado;
    }
}