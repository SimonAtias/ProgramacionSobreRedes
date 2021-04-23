export class CalificacionComprador{

    private id: number;
    private comprador: Usuario;
    private vendedor: Usuario;
    private calificacion: number;
    private fecha: Date;

    public find(connection, id){
        connection.query( 'SELECT * FROM ecommerce.calificaciones_compradores WHERE id='+ id +';', function (error, results, field){
            if (error) throw error;
            return results;
        });
    }
    
}

export class CalificacionVendedor{

    private id: number;
    private comprador: Usuario;
    private vendedor: Usuario;
    private calificacion: number;
    private fecha: Date;

    public find(connection, id){
        connection.query( 'SELECT * FROM ecommerce.calificaciones_vendedores WHERE id='+ id +';', function (error, results, field){
            if (error) throw error;
            return results;
        });
    }

}

export class compras{

    private id: number;
    private Producto: Producto;
    private cantidad: number;
    private fecha: Date;
    private compradorCalificado: boolean;
    private vendedorCalificado: boolean;

    public find(connection, id){
        connection.query( 'SELECT * FROM ecommerce.compras WHERE id='+ id +';', function (error, results, field){
            if (error) throw error;
            return results;
        });
    }
}

export class Usuario{

    private id: number;
    private username: String;
    private saldo: number;
    private calificacionComprador: number;
    private calificacionVendedor: number;

    public find(connection, id){
        connection.query( 'SELECT * FROM ecommerce.usuarios WHERE id='+ id +';', function (error, results, field){
            if (error) throw error;
            return results;
        });
    }

}

export class Producto{

    private id: number;
    private vendedor: Usuario;
    private nombre: String;
    private precio: number;
    private stock: number;
    private usado: boolean;

    public find(connection, id){
        connection.query( 'SELECT * FROM ecommerce.productos WHERE id='+ id +';', function (error, results, field){
            if (error) throw error;
            return results;
        });
    }

}

export class Favorito{
    
    private id: number;
    private usuario: Usuario;
    private producto: Producto;

    public find(connection, id){
        connection.query( 'SELECT * FROM ecommerce.favoritos WHERE id='+ id +';', function (error, results, field){
            if (error) throw error;
            return results;
        });
    }

}
