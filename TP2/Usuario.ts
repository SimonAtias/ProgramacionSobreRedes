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

    

    



}