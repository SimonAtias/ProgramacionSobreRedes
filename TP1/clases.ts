
export enum Region { AR, BR, CH,}

export class Contenido{

    private fecha: Date;
    private duracion: number;

    constructor (duracion: number){

        this.duracion = duracion;
        this.fecha = new Date();

    }

    public getDate(): Date{       
        return this.fecha;
    }

    public getDuracion(): number{
        return this.duracion;
    }
    

}

class Titulo{

    private nombre: String;
    private regiones: Array<Region>;

    constructor (nombre: String){
        
        this.nombre = nombre;
        this.regiones = new Array<Region>();

    }

    public agregarRegion(region: Region){
        
        if(!this.regiones.includes(region)){
            this.regiones.push(region);
        }

    }

    public quitarRegion(regionAEliminar: Region){

        if(this.regiones.includes(regionAEliminar)){
            this.regiones.splice(this.regiones.indexOf(regionAEliminar), 1);
        }

    }

    public getTitulo(): String{
        return this.nombre;
    }

    public setTitulo(nuevo: String){
        this.nombre=nuevo;
    }

    public disponible(region: Region): boolean{
        return this.regiones.includes(region);
    }

}

export class Pelicula extends Titulo{

    private contenido: Contenido;

    constructor (nombre: String){
        super(nombre);
    }

    public getContenido(): Contenido{
        return this.contenido;
    }

    public setContenido(contenidoNuevo: Contenido){
        this.contenido=contenidoNuevo;
    }


}

export class Serie extends Titulo{

    private capitulos: Array<Contenido>;

    constructor(nombre: String){
        super(nombre);
        this.capitulos=new Array<Contenido>();
    }

    public agregarCapitulo(capituloNuevo: Contenido){
        this.capitulos.push(capituloNuevo);
    }

    public obtenerCapitulo(numeroCapitulo: number): Contenido{
        return this.capitulos[numeroCapitulo];
    }

    public cantidadDeCapitulos(): number{
        return this.capitulos.length;
    }

    public primerCapitulo(): Contenido{
        return this.capitulos[0];
    }

    public getCapitulos(): Array<Contenido>{
        return this.capitulos;
    }

}

export class Usuario{

    private username: String;
    private region: Region;
    private tiempoDeContenidoVisto: Map<Contenido, number>; // el number es la cantidad de minutos vistos
    private ultimoCapituloVisto: Map<Serie, number>; // Necesito un registro de cual fue el ultimo capitulo visto, porque sino no hay forma de darse cuenta

    constructor(nombreUsuario: String, regionUsuario: Region){
        this.username=nombreUsuario;
        this.region=regionUsuario;
        this.tiempoDeContenidoVisto=new Map();
        this.ultimoCapituloVisto=new Map();
    }

    public getUsername(): String{
        return this.username;
    }

    public getRegion(): Region{
        return this.region;
    }

    public visto(titulo: Titulo): boolean{
        if (titulo instanceof Serie){
            let ultimoCapitulo = titulo.obtenerCapitulo(titulo.cantidadDeCapitulos()-1);
            if(this.ultimoCapituloVisto.has(titulo) && this.ultimoCapituloVisto.get(titulo)==(titulo.cantidadDeCapitulos()-1)){
                if(this.tiempoDeContenidoVisto.get(ultimoCapitulo)>ultimoCapitulo.getDuracion()-2){
                    return true;
                }
            }
        }
        else if(titulo instanceof Pelicula){
            if(this.tiempoDeContenidoVisto.has(titulo.getContenido())){
                if(titulo.getContenido().getDuracion()-3<this.tiempoDeContenidoVisto.get(titulo.getContenido())){
                    return true;
                }
            }
        }
        return false;
    }

    public viendo(titulo: Titulo): boolean{
        if(!this.visto(titulo)){ // si no fue vista, quiere decir que, o la esta viendo, o ni siquiera la vio
            if(titulo instanceof Serie){ 
                if(this.ultimoCapituloVisto.has(titulo)){ //checkea si el ultimo capitulo que vio de esta serie esta en ultimoCapituloVisto.
                    return true;                          //Si lo está, la esta viendo. Si esta, y se completo la serie, ni llega a ese if.
                }
                /*for(let i = 0; i < titulo.cantidadDeCapitulos(); i++){
                    if(this.tiempoDeContenidoVisto.has(titulo.obtenerCapitulo(i))){
                        return true;
                    }
                }*/
            }
            else if(titulo instanceof Pelicula){
                if(this.tiempoDeContenidoVisto.has(titulo.getContenido())){
                    return true
                }
            }
        }
        return false;
    }

    public capituloActual(serie: Titulo): number{
        if(serie instanceof Serie){ 
            if(this.ultimoCapituloVisto.has(serie)){
                return this.ultimoCapituloVisto.get(serie);
            }
            /*if(this.ultimoCapituloVisto.has(serie)){ //si se vio un capitulo de esa serie
                let contenidoUltimoCapituloVisto = serie.obtenerCapitulo((this.ultimoCapituloVisto.get(serie)))
                if(this.tiempoDeContenidoVisto.get(contenidoUltimoCapituloVisto)>contenidoUltimoCapituloVisto.getDuracion()-2){ //si se termino el capitulo
                    if(this.ultimoCapituloVisto.get(serie)!=serie.cantidadDeCapitulos()-1){ // si no es el ultimo capitulo
                        return this.ultimoCapituloVisto.get(serie)+1;
                    }
                }
                else{
                    return this.ultimoCapituloVisto.get(serie);
                }
            }*/
            return 0;
        }
    }

    public ver(titulo: Titulo, tiempo_visualizado: number): boolean{
        if(titulo.disponible(this.region)){
            if(titulo instanceof Serie){
                let numCapitulo = this.capituloActual(titulo); //guardo num capitulo actual
                if(numCapitulo==0 && !this.tiempoDeContenidoVisto.has(titulo.obtenerCapitulo(numCapitulo))){
                    this.tiempoDeContenidoVisto.set(titulo.obtenerCapitulo(numCapitulo),0); // si es el primer capitulo, agrego un contenido con tiempo de visualizacion para trabajar con el en tiempoDeContenidoVisto
                }
                while(tiempo_visualizado>0){ 
                    let capitulo = titulo.obtenerCapitulo(numCapitulo); //guardo el contenido de un capitulo
                    if(tiempo_visualizado+this.tiempoDeContenidoVisto.get(capitulo)<capitulo.getDuracion()){ //si el tiempo que se ve en el capitulo no alcanza para terminarlo
                        let tiempoVisualizadoUltCap = this.tiempoDeContenidoVisto.get(capitulo); // saco cuanto se vio del ultimo capitulo
                        this.tiempoDeContenidoVisto.set(capitulo, tiempoVisualizadoUltCap+tiempo_visualizado); // guardo en tiempoDeContenidoVisto el capitulo con el tiempo que se vio
                        tiempo_visualizado=0; // ya no quiero que siga el loop
                    }
                    else{ // si se ven mas minutos de los que tiene restantes el capitulo
                        tiempo_visualizado=tiempo_visualizado-(capitulo.getDuracion()-this.tiempoDeContenidoVisto.get(capitulo)); // le resto el tiempo que se vio a tiempo_visualizado
                        this.tiempoDeContenidoVisto.set(capitulo, capitulo.getDuracion()); // indico que el capitulo fue terminado en tiempoDeContenidoVisto
                        if(numCapitulo==titulo.cantidadDeCapitulos()-1){ // si se llego al ultimo capitulo, igualo el tiempo visualizado a 0 para evitar errores
                            tiempo_visualizado=0;
                        }
                        else{ // sino, le sumo 1 al numCapitulo
                            numCapitulo++;
                            this.tiempoDeContenidoVisto.set(titulo.obtenerCapitulo(numCapitulo), 0); // agrego un contenido con tiempo de visualizacion para trabajar con el en tiempoDeContenidoVisto
                            this.ultimoCapituloVisto.set(titulo, numCapitulo); // e indico que el ultimo capitulo visto de dicha serie es el especifico                        
                        }
                    }
                }
            }
            else if(titulo instanceof Pelicula){
                if(!this.tiempoDeContenidoVisto.has(titulo.getContenido())){
                    this.tiempoDeContenidoVisto.set(titulo.getContenido(), 0);
                }
                let vistoTotalPelicula = tiempo_visualizado+this.tiempoDeContenidoVisto.get(titulo.getContenido());
                if(vistoTotalPelicula>=titulo.getContenido().getDuracion()){
                    this.tiempoDeContenidoVisto.set(titulo.getContenido(), titulo.getContenido().getDuracion());
                    console.log(this.tiempoDeContenidoVisto.get(titulo.getContenido()))
                }
                else{
                    this.tiempoDeContenidoVisto.set(titulo.getContenido(), vistoTotalPelicula);
                }
            }
            return true;
        }
        return false;
    }

}

export class Sistema{

    private nombre: String;
    private usuarios: Array<Usuario>;
    private titulos: Array<Titulo>;

    constructor (){
        this.nombre = "Sistema";
        this.usuarios = new Array<Usuario>();
        this.titulos = new Array<Titulo>();
    }

    public agregarUsuario(usuario: Usuario): boolean{
        for( let i = 0; i > 0; i++){
            if(usuario.getUsername()==this.usuarios[i].getUsername()){
                return false;
            }
        }
        this.usuarios.push(usuario);
        return true;
    }

    public agregarTitulo(titulo: Titulo){
        this.titulos.push(titulo);
    }

    public buscarUsuario(nombre: String): Usuario{
        return this.usuarios.find(Usuario => Usuario.getUsername() == nombre);
    }

    public buscarTitulo(nombre: String): Array<Titulo>{
        let arrTitulos: Array<Titulo>;
        for(let i = 0; i > 0; i++){
            if(this.titulos[i].getTitulo()==nombre){
                arrTitulos.push(this.titulos[i]);
            }
        }
        return arrTitulos;
    }

}