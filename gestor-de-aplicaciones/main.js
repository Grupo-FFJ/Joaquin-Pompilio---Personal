import { Publicacion } from "./publicacion.js";
import { Usuario } from "./usuario.js";
import { RepositorioPublicaciones } from "./RepositorioPublicaciones.js";

let usuario1 = new Usuario("carniceria borjes","asda@jimijimol.com")
let usuario2 = new Usuario("carniceria milan","asda@jimijimol.com")
let usuario3 = new Usuario("carniceria borjes","asda@jimijimol.com")

let arreglo = [
    new Publicacion("chorizo", "vegano",usuario1),
    new Publicacion("fideos", "vegano", new Usuario("churreria magnolia","asda@jimijimol.com")),
    new Publicacion("morcilla", "vegano", usuario1),
    new Publicacion("carne", "semi-vegano", new Usuario("carniceria borjes","asda@jimijimol.com"))
]

arreglo[0].titulo = "fui modificado, Hamburguesa"
arreglo[0].activa = false
arreglo[2].descripcion = "fui modificado, tengo gluten"
arreglo[2].descripcion = "fui modificado, no soy vegano"
arreglo[3].autor.nombre = "antes era borjes, ahora soy borja" //es un objeto ahora

for (let i =0; i<arreglo.length; i++){
    console.log(arreglo[i].mostrarResumen())
    if (arreglo[i].activa) {
      console.log("Esta Activa")
    } else {
        console.log("Esta No Esta Activa")
    }
    console.log("-------------------")
}

arreglo.push(new Publicacion("Pesto","sin tac",new Usuario("Maximo Asimov","asda@jimijimol.com")))
arreglo[4].activa = false
let contador = 0
for (let l=0; l<arreglo.length; l++) {
    if (arreglo[l].activa) {
        contador++;
        console.log(arreglo[l].titulo)
        console.log("--------------")
    }
}
console.log(contador)


console.log("------------------")
console.log("Voy a ver que publicaciones tienen el nombre: carniceria borjes")
for (let m=0; m<arreglo.length; m++) {
    if (arreglo[m].esDeAutor("carniceria borjes")) {
        console.log("El arreglo tiene de autor: "+arreglo[m].autor.nombre)
        console.log("Coincide con el nombre de autor pasado")
    }
}

console.log("-------Usando forEach-----------")
arreglo.forEach(function(publicaciones) {
  console.log(publicaciones.mostrarResumen());
});

console.log("-------Usando filter-----------")
const activos = arreglo.filter(publicacion => publicacion.activa);
for (let i=0; i<activos.length; i++) {
    console.log("las publicaciones activas son: "+activos[i].titulo)
}

console.log("-------Usando find (primer publicacion activa)-----------")
const publicacionActiva = arreglo.find((elemento) => elemento.activa);
console.log(publicacionActiva.titulo)

console.log("cambiando email de un usuario, con el mismo nombre")
usuario1.email = "cambieElEmail@gmail.com"
console.log("Si es correcto, aparece dos veces el mismo email")
console.log(arreglo[0].autor.email)
console.log(arreglo[2].autor.email)

//parte 4
let publicacionesArreglo = new RepositorioPublicaciones()
arreglo.forEach(p => publicacionesArreglo.agregar(p))

let publicacionesConUsuario = publicacionesArreglo.buscarPorUsuario("carniceria borjes")
console.log(publicacionesConUsuario)
console.log("El nombre coincide con: "+publicacionesConUsuario.length)

//extra<
console.log("Extras!")
let publicacionesActivas = publicacionesArreglo.filtrarActivas()
console.log(publicacionesActivas)
console.log("Las publicaciones activas son: "+publicacionesActivas.length)

//extra
console.log("Cantidad de publicaciones: "+publicacionesArreglo.cantidadTotal())