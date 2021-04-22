export class CalificacionComprador{

    private id: number;
    private comprador: Usuario;
    private vendedor: Usuario;
    private calificacion: number;
    private fecha: Date;
    
}

export class CalificacionVendedor{

    private id: number;
    private comprador: Usuario;
    private vendedor: Usuario;
    private calificacion: number;
    private fecha: Date;

}

export class compras{

    private id: number;
    private Producto: Producto;
    private cantidad: number;
    private fecha: Date;
    private compradorCalificado: boolean;
    private vendedorCalificado: boolean;
}

export class Usuario{

    private id: number;
    private username: String;
    private saldo: number;
    private calificacionComprador: number;
    private calificacionVendedor: number;

}

export class Producto{

    private id: number;
    private vendedor: Usuario;
    private nombre: String;
    private precio: number;
    private stock: number;
    private usado: boolean;

}

export class Favorito{
    
    private id: number;
    private usuario: Usuario;
    private producto: Producto;

}
