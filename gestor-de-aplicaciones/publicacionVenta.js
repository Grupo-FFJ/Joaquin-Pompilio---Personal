import { Publicacion } from "./publicacion.js";
export class PublicacionVenta extends Publicacion {
    precio
    stock
    //
    constructor(titulo,descripcion,autor,precio,){
        super(titulo,descripcion,autor);
        this.precio = precio
        this.stock = 1
    }
}