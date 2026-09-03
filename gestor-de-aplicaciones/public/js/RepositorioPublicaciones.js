import { EventEmitter } from "node:events";


export class RepositorioPublicaciones extends EventEmitter{
    constructor(){
        super()
        this.arreglo = []
    }
    agregar(publicacion) {
        this.arreglo.push(publicacion)
        this.emit("publicacionAgregada", publicacion);
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
    publicarConDemora(publicacion, callback) {
        setTimeout(() => {
            this.agregar(publicacion)
            callback("Publicando con delay")
        },5000
        )
    }
    
    publicarConDemoraAsync(publicacion) {
        return new Promise((resolve) => {
            console.log("Procesando publicacion ...")
            setTimeout(() => {
                resolve(publicacion)
            },2000);
        }) }
}