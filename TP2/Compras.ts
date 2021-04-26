export class Compras{

    private id: number;
    private id_usuario: number;
    private id_producto: number;
    private cantidad: number;
    private fecha: Date;
    private compradorCalificado: boolean;
    private vendedorCalificado: boolean;
    protected static query:string="";
    
    constructor(
        id: number, 
        id_usuario: number,
        id_producto: number, 
        cantidad: number, 
        fecha: Date, 
        compradorCalificado: boolean, 
        vendedorCalificado: boolean
    ) {
        this.id = id
        this.id_usuario = id_usuario
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

    public getId_usuario(): number {
        return this.id_usuario;
    }

    public setId_usuario(id_usuario: number): void {
        this.id_usuario = id_usuario;
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

    public static async find(connection, id){
        return new Promise(function (resolve, reject){
            connection.query('SELECT * FROM compras where id='+ id, function(error, results){
                if (error) reject (error);
                let compras = new Compras(results[0].id, results[0].id_usuario, results[0].id_producto, results[0].cantidad, results[0].fecha, results[0].comprador_calificado, results[0].vendedor_calificado);
                resolve(compras);
            });
        });
    }

    public async save(connection){
        let query = 'UPDATE Compras SET id=' + this.getId() + ', id_usuario=' + this.getId_usuario() + ', id_producto= "' + this.getId_producto() + '", cantidad=' + this.getCantidad()  + ', fecha=' + this.getFecha() + ', comprador_calificado=' + this.isCompradorCalificado() + ', vendedor_calificado=' + this.isVendedorCalificado() + ' where id= ' + this.getId() + ';'
        await connection.query(query, function(error, results){
            if (error){
                throw error;
            }
            return; 
        });
    }

    public static where(comparaX, comparador, cant){
        if(Compras.query == ""){
            Compras.query = "SELECT * FROM compras WHERE 1"
        }
        if(cant == null){
            return this;
        }
        Compras.query = Compras.query.concat(' AND ' + comparaX+' ' + comparador+' ' + cant+' ')
        return this;
    }

    public static orderBy(ordenaX, ordena){
        if(ordenaX == null){
            return this;
        }
        Compras.query = Compras.query.concat(' ORDER BY '+ ordenaX +' '+ ordena);
        return this;
    }

    public static async get(connection){
        return new Promise(function (resolve, reject){
            connection.query(Compras.query, function (error, results){
                if (error) reject (error);
                let compras:Array<Compras> = new Array();
                results.forEach(element => {
                    compras.push(new Compras(element.id, element.id_usuario, element.id_producto, element.cantidad, element.fecha, element.comprador_calificado, element.vendedor_calificado));
                });
                Compras.query = "";
                resolve(compras)
            });
        });
    }

}