export class CalificacionVendedor{

    private id: number;
    private id_comprador: number;
    private id_vendedor: number;
    private calificacion: number;
    private fecha: Date;
    protected static query:string="";

    constructor(
        id: number, 
        id_comprador: number, 
        id_vendedor: number, 
        calificacion: number, 
        fecha: Date
    ) {
        this.id = id
        this.id_comprador = id_comprador
        this.id_vendedor = id_vendedor
        this.calificacion = calificacion
        this.fecha = fecha
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getId_comprador(): number {
        return this.id_comprador;
    }

    public setId_comprador(id_comprador: number): void {
        this.id_comprador = id_comprador;
    }

    public getId_vendedor(): number {
        return this.id_vendedor;
    }

    public setId_vendedor(id_vendedor: number): void {
        this.id_vendedor = id_vendedor;
    }

    public getCalificacion(): number {
        return this.calificacion;
    }

    public setCalificacion(calificacion: number): void {
        this.calificacion = calificacion;
    }

    public getFecha(): Date {
        return this.fecha;
    }

    public setFecha(fecha: Date): void {
        this.fecha = fecha;
    }
}