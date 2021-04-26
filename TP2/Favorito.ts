export class Favorito{

    private id: number;
    private id_usuario: number;
    private id_producto: number;
    protected static query:string="";

    constructor(id: number, id_usuario: number, id_producto: number) {
        this.id = id
        this.id_usuario = id_usuario
        this.id_producto = id_producto
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

    public static async find(connection, id){
        return new Promise(function (resolve, reject){
            connection.query('SELECT * FROM favoritos where id='+ id, function(error, results){
                if (error) reject (error);
                let favoritos = new Favorito (results[0].id, results[0].id_usuario, results[0].id_producto);
                resolve(favoritos);
            });
        });   
    }

    public async save(connection){
        let query = 'UPDATE Favorito SET id=' + this.getId() + ', id_usuario=' + this.getId_usuario() + ', id_producto= "' + this.getId_producto() + ' where id= ' + this.getId() + ';'
        console.log(query);
        await connection.query(query, function(error, results){
            if (error){
                throw error;
            }
            return; 
        });
    }

    public static where(comparaX, comparador, cant){
        if(Favorito.query == ""){
            Favorito.query = "SELECT * FROM favoritos WHERE 1"
        }
        Favorito.query = Favorito.query.concat(' AND ' + comparaX + comparador + cant)
        return this;
    }

    public static orderBy(ordenaX, ordena){
        Favorito.query = Favorito.query.concat(' ORDER BY '+ ordenaX +' '+ ordena);
        return this;
    }

    public static async get(connection){
        return new Promise(function (resolve, reject){
            connection.query(Favorito.query, function (error, results){
                if (error) reject (error);
                let favoritos:Set<Favorito> = new Set();
                results.forEach(element => {
                    favoritos.add(new Favorito(element.id, element.id_usuario, element.id_producto));
                });
                Favorito.query = "";
                resolve(favoritos) 
            });
        });
    }

}