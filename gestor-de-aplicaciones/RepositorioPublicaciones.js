export class RepositorioPublicaciones{
    constructor(){
        this.arreglo = []
    }
    agregar(publicacion) {
        this.arreglo.push(publicacion)
    }
    buscarPorUsuario(nombre) {
        const arregloConUsuario = this.arreglo.filter(publicacion => publicacion.autor.nombre == nombre);
        return arregloConUsuario
    }
    filtrarActivas() {
        const arregloConActivas = this.arreglo.filter(publicacion => publicacion.activa == true)
        return arregloConActivas   
    }
    cantidadTotal() {
        return this.arreglo.length
    }
}