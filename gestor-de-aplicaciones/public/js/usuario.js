export class Usuario{
    constructor(nombre,email){
        this.nombre = nombre
        this.email = email
        this.fechaRegistro = new Date()
        this.contacto = []
    }
    mostrarPerfil() {
        return this.nombre+" "+this.email
    }
   
}
/*¿Por qué this.contactos es una asociación y no una dependencia? ¿Qué multiplicidad tiene
esa auto-asociación (Usuario 1 — * Usuario)?
-Es una asociación porque la referencia a los otros objetos Usuario se almacena como un atributo en la clase this.contactos y se puede acceder en cualquier instancia  
-Es una multiplicidad de uno a muchos un único usuario puede tener referenciados en su lista de contactos cero, uno o múltiples objetos de tipo Usuario
|Usuario |1 — * |Usuario|
*/