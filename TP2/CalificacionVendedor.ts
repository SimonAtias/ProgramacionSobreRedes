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

    public static async find(connection, id){
        return new Promise(function (resolve, reject){
            connection.query('SELECT * FROM calificaciones_vendedores where id='+ id, function(error, results){
                if (error) reject (error);
                let calificaciones_vendedores = new CalificacionVendedor(results[0].id, results[0].id_vendedor, results[0].id_comprador, results[0].calificacion, results[0].fecha);
                resolve (calificaciones_vendedores);
            });
        });    
    }

    public async save(connection){
        let query = 'UPDATE Favorito SET id=' + this.getId() + ', id_vendedor=' + this.getId_vendedor() + ', id_comprador= "' + this.getId_comprador() +  ', calificacion= "' + this.getCalificacion() +  ', fecha= "' + this.getFecha() + ' where id= ' + this.getId() + ';'
        console.log(query);
        await connection.query(query, function(error, results){
            if (error){
                throw error;
            }
            return; 
        });
    }

    public static where(comparaX, comparador, cant){
        if(CalificacionVendedor.query == ""){
            CalificacionVendedor.query = "SELECT * FROM calificaciones_vendedores WHERE 1"
        }
        CalificacionVendedor.query = CalificacionVendedor.query.concat(' AND ' + comparaX + comparador + cant)
        return this;
    }

    public static orderBy(ordenaX, ordena){
        CalificacionVendedor.query = CalificacionVendedor.query.concat(' ORDER BY '+ ordenaX +' '+ ordena);
        return this;
    }

    public static async get(connection){
        return new Promise(function (resolve, reject){
            connection.query(CalificacionVendedor.query, function (error, results){
                if (error) reject (error);
                let calificaciones_vendedores:Set<CalificacionVendedor> = new Set();
                results.forEach(element => {
                    calificaciones_vendedores.add(new CalificacionVendedor(element.id, element.id_vendedor, element.id_comprador, element.calificacion, element.fecha));
                });
                CalificacionVendedor.query = "";
                resolve(calificaciones_vendedores) 
            });
        });
    }

}