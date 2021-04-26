export class Usuario{
    
    private id: number;
    private username: String;
    private saldo: number;
    private calificacion_vendedor: number;
    private calificacion_comprador: number;
    protected static query:string="";

    constructor(
        id: number, 
        username: String, 
        saldo: number, 
        calificacion_vendedor: number, 
        calificacion_comprador: number,
    ) {
        this.id = id
        this.username = username
        this.saldo = saldo
        this.calificacion_vendedor = calificacion_vendedor
        this.calificacion_comprador = calificacion_comprador
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getUsername(): String {
        return this.username;
    }

    public setUsername(username: String): void {
        this.username = username;
    }

    public getSaldo(): number {
        return this.saldo;
    }

    public setSaldo(saldo: number): void {
        this.saldo = saldo;
    }

    public getCalificacion_vendedor(): number {
        return this.calificacion_vendedor;
    }

    public setCalificacion_vendedor(calificacion_vendedor: number): void {
        this.calificacion_vendedor = calificacion_vendedor;
    }

    public getCalificacion_comprador(): number {
        return this.calificacion_comprador;
    }

    public setCalificacion_comprador(calificacion_comprador: number): void {
        this.calificacion_comprador = calificacion_comprador;
    }

    public static async find(connection, id){
        return new Promise(function (resolve, reject){ 
        connection.query('SELECT * FROM usuarios where id='+ id, function(error, results){
                if (error) reject (error);
                let usuarios = new Usuario(results[0].id, results[0].username, results[0].saldo, results[0].calificacion_vendedor, results[0].calificacion_comprador);
                resolve (usuarios);
            });
        });
    }

    public async save(connection){
        let query = 'UPDATE Favorito SET id=' + this.getId() + ', username=' + this.getUsername() + ', saldo= "' + this.getSaldo() +  ', calificacion_vendedor= "' + this.getCalificacion_vendedor() +  ', calificacion_comprador= "' + this.getCalificacion_comprador() + ' where id= ' + this.getId() + ';'
        console.log(query);
        await connection.query(query, function(error, results){
            if (error){
                throw error;
            }
            return; 
        });
    }

    public static where(comparaX, comparador, cant){
        if(Usuario.query == ""){
            Usuario.query = "SELECT * FROM usuarios WHERE 1"
        }
        Usuario.query = Usuario.query.concat(' AND ' + comparaX + comparador + cant)
        return this;
    }

    public static orderBy(ordenaX, ordena){
        Usuario.query = Usuario.query.concat(' ORDER BY '+ ordenaX +' '+ ordena);
        return this;
    }

    public static async get(connection){
        return new Promise(function (resolve, reject){
            connection.query(Usuario.query, function (error, results){
                if (error) reject (error);
                let usuarios:Set<Usuario> = new Set();
                results.forEach(element => {
                    usuarios.add(new Usuario(element.id, element.username, element.saldo, element.calificacion_vendedor, element.calificacion_comprador));
                });
                Usuario.query = "";
                resolve(usuarios) 
            });
        });
    }
}