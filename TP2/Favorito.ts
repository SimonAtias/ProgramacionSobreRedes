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
}