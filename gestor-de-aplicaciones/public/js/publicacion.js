export class Publicacion{
    //es para los types
    titulo
    descripcion
    autor
    fechaPublicacion
    activa
    //
    constructor(titulo,descripcion,autor){
        this.titulo = titulo
        this.descripcion = descripcion
        this.autor = autor //es un objeto tipo usuario
        this.fechaPublicacion = new Date()
        this.activa = true

    }
    mostrarResumen() {
        return this.titulo+" "+this.descripcion+" "+this.autor.nombre
    }
    estaActiva() {
        return this.activa
    }
    esDeAutor(nombre) {
        return this.autor.nombre === nombre
    }
    diasPublicada() {
        const ms = new Date() - this.fechaPublicacion
        return Math.floor(ms / (1000 * 60 * 60 * 24)) // lo paso a dias y redondea para abajo con floor (investigar)
    }
    darDeBaja() { this.activa = false; }
}
