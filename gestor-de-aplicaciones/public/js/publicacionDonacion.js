import { Publicacion } from "./publicacion.js"

/* Agreguen una tercera subclase al sistema: PublicacionDonacion, para publicaciones donde se regala un material sin
costo. Debe heredar de Publicacion y agregar un atributo propio motivo (por qué se dona). */
class PublicacionDonacion extends Publicacion {
    constructor(titulo,descripcion,autor,motivo) {
        super(titulo,descripcion,autor)
        this.motivo = motivo
    }
}