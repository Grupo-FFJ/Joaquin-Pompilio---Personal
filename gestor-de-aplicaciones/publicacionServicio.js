import { Publicacion } from "./publicacion.js";
export class PublicacionServicio extends Publicacion {
    modalidad
    duracionMinutos
    //
    constructor(titulo,descripcion,autor,modalidad,duracionMinutos){
        super(titulo,descripcion,autor);
        this.modalidad = modalidad
        this.duracionMinutos = duracionMinutos
    }
        mostrarResumen() {
        const resumenPadre = super.mostrarResumen()
        return `${resumenPadre} modalidad: ${this.modalidad} duracion: ${this.duracionMinutos}`
    }
}