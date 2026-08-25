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
}