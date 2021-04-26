import { CalificacionVendedor } from "./CalificacionVendedor";

export class CalificacionComprador{

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
    
    public static async find(connection, id){
        return new Promise(function (resolve, reject){
            connection.query('SELECT * FROM calificaciones_compradores where id='+ id, function(error, results){
                if (error) reject (error);
                let calificaciones_compradores = new CalificacionComprador(results[0].id, results[0].id_comprador, results[0].id_vendedor, results[0].calificacion, results[0].fecha);
                resolve (calificaciones_compradores);
            });
        });
    }

    public async save(connection){
        let query = 'UPDATE Favorito SET id=' + this.getId() + ', id_comprador=' + this.getId_comprador() + ', id_vendedor= "' + this.getId_vendedor() +  ', calificacion= "' + this.getCalificacion() +  ', fecha= "' + this.getFecha() + ' where id= ' + this.getId() + ';'
        console.log(query);
        await connection.query(query, function(error, results){
            if (error){
                throw error;
            }
            return; 
        });
    }

    public static where(comparaX, comparador, cant){
        if(CalificacionComprador.query == ""){
            CalificacionComprador.query = "SELECT * FROM calificaciones_compradores WHERE 1"
        }
        CalificacionComprador.query = CalificacionComprador.query.concat(' AND ' + comparaX + comparador + cant)
        return this;
    }

    public static orderBy(ordenaX, ordena){
        CalificacionComprador.query = CalificacionComprador.query.concat(' ORDER BY '+ ordenaX +' '+ ordena);
        return this;
    }

    public static async get(connection){
        return new Promise(function (resolve, reject){
            connection.query(CalificacionComprador.query, function (error, results){
                if (error) reject (error);
                let calificaciones_compradores:Set<CalificacionComprador> = new Set();
                results.forEach(element => {
                    calificaciones_compradores.add(new CalificacionComprador(element.id, element.id_comprador, element.id_vendedor, element.calificacion, element.fecha));
                });
                CalificacionComprador.query = "";
                resolve(calificaciones_compradores) 
            });
        });
    }
}