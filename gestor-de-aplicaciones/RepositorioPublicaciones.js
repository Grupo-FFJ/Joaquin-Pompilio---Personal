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
    listarPorTipo(claseConstructor) {
        return this.arreglo.filter(publicacion => publicacion instanceof claseConstructor);
    }
    filtrarActivas() {
        const arregloConActivas = this.arreglo.filter(publicacion => publicacion.activa == true)
        return arregloConActivas   
    }
    cantidadTotal() {
        return this.arreglo.length
    }
    listaResumenes() {
        const mapaResumenes = this.arreglo.map(publicacion => publicacion.mostrarResumen())
        return mapaResumenes
    }
    filtrarPorTipo(claseConstructor) {
        const publicaciones = this.arreglo.filter(p => p instanceof claseConstructor)
        return publicaciones
    }
}