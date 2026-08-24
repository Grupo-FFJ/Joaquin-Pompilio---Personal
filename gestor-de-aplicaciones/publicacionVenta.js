
class PublicacionVenta extends publicacion {
    titulo
    descripcion
    autor
    fechaPublicacion
    activa
    precio
    stock
    //
    constructor(titulo,descripcion,autor,precio){
        super(titulo,descripcion,autor);
        this.precio = precio
        this.stock = 1
    }
}