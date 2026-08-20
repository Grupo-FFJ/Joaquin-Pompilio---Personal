export class Usuario{
    //es para los types
    #nombre
    #email
    #fechaRegistro
    //
    constructor(nombre,email){
        this.nombre = nombre
        this.email = email
        this.fechaRegistro = new Date()
    }
    mostrarPerfil() {
        return this.nombre+" "+this.email
    }
   
}