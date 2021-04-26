import { copyFileSync } from "node:fs";
import { cpuUsage } from "node:process";

export class Producto{
    
    private id: number;
    private id_vendedor: number;
    private nombre: String;
    private precio: number;
    private stock: number;
    private usado: boolean;
    protected static query:string="";

    constructor(
        id: number, 
        vendedor: number, 
        nombre: String, 
        precio: number, 
        stock: number, 
        usado: boolean,
    ) {
        this.id = id
        this.id_vendedor = vendedor
        this.nombre = nombre
        this.precio = precio
        this.stock = stock
        this.usado = usado
    }
    
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getVendedor(): number {
        return this.id_vendedor;
    }

    public setVendedor(vendedor: number): void {
        this.id_vendedor = vendedor;
    }

    public getNombre(): String {
        return this.nombre;
    }

    public setNombre(nombre: String): void {
        this.nombre = nombre;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public setPrecio(precio: number): void {
        this.precio = precio;
    }

    public getStock(): number {
        return this.stock;
    }

    public setStock(stock: number): void {
        this.stock = stock;
    }

    public isUsado(): boolean {
        return this.usado;
    }

    public setUsado(usado: boolean): void {
        this.usado = usado;
    }

    public static async find(connection, id){
        return new Promise(function (resolve, reject){
            connection.query('SELECT * FROM productos where id='+ id, function(error, results){
                if (error) reject (error);
                let producto = new Producto(results[0].id, results[0].vendedor, results[0].nombre, results[0].precio, results[0].stock, results[0].usado);
                resolve(producto);
            });
        });
    }

    public async save(connection){
        let query = 'UPDATE productos SET id=' + this.getId() + ', vendedor=' + this.getVendedor() + ', nombre= "' + this.getNombre() + '", precio=' + this.getPrecio()  + ', stock=' + this.getStock() + ', usado=' + this.isUsado() + ' where id=' + this.getId() + ';'
        console.log(query);
        await connection.query(query, function(error, results){
            if (error){
                throw error;
            }
            return; 
        });
    }

    public static where(comparaX, comparador, cant){
        if(Producto.query == ""){
            Producto.query = "SELECT * FROM productos WHERE 1"
        }
        Producto.query = Producto.query.concat(' AND ' + comparaX + comparador + cant)
        return this;
    }

    public static orderBy(ordenaX, ordena){
        Producto.query = Producto.query.concat(' ORDER BY '+ ordenaX +' '+ ordena);
        return this;
    }

    public static async get(connection){
        return new Promise(function (resolve, reject){
            connection.query(Producto.query, function (error, results){
                if (error) reject (error);
                let productos:Set<Producto> = new Set();
                results.forEach(element => {
                    productos.add(new Producto(element.id, element.vendedor, element.nombre, element.precio, element.stock, element.usado));
                });
                Producto.query = "";
                resolve(productos)
            });
        });
    }
}