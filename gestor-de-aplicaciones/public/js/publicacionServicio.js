import { Publicacion } from "./publicacion.js";
export class PublicacionServicio extends Publicacion {
    modalidad
    duracionMinutos
    cliente
    //
    constructor(titulo,descripcion,autor,modalidad,duracionMinutos,cliente = null){
        super(titulo,descripcion,autor);
        this.modalidad = modalidad
        this.duracionMinutos = duracionMinutos
        this.cliente = cliente
    }
        mostrarResumen() {
        const resumenPadre = super.mostrarResumen()
        return `${resumenPadre} modalidad: ${this.modalidad} duracion: ${this.duracionMinutos}`
    }
}   /* En PublicacionServicio.js agreguen this.cliente, otro atributo del tipo Usuario que
representa quién reservó el servicio. Ahora Usuario cumple dos roles distintos frente
a Publicacion: autor y cliente. */
    