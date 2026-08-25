import { Publicacion } from "./publicacion.js";
import { Usuario } from "./usuario.js";
import { RepositorioPublicaciones } from "./RepositorioPublicaciones.js";
import { PublicacionVenta} from "./publicacionVenta.js"
import { PublicacionServicio} from "./publicacionServicio.js"

let usuario1 = new Usuario("carniceria borjes","asda@jimijimol.com")
let usuario2 = new Usuario("carniceria milan","asda@jimijimol.com")
let usuario3 = new Usuario("carniceria borjes","asda@jimijimol.com")


let arreglo = [
    new PublicacionVenta("chorizo", "vegano", usuario1, 1500),
    new PublicacionVenta("fideos", "vegano", new Usuario("churreria magnolia", "asda@jimijimol.com"), 800),
    new PublicacionVenta("pizzetas", "vegano", usuario1, 2200),
    new PublicacionServicio("Clases particulares", "Matematica", new Usuario("Juan Lopez", "asda@jimijimol.com"), "Online", 60)
];

arreglo[0].titulo = "fui modificado, Hamburguesa";
arreglo[0].activa = false;
arreglo[2].descripcion = "fui modificado, no soy vegano";
arreglo[3].autor.nombre = "antes era borjes, ahora soy borja";

// VERIFICACIÓN: Comprobación con instanceof
console.log("--- Verificación instanceof Publicacion ---");
arreglo.forEach((p, index) => {
    const esPublicacion = p instanceof Publicacion;
    console.log(`El elemento ${index} (${p.titulo}): instanceof Publicacion -> ${esPublicacion}`);
});

console.log("--- Recorrido del arreglo ---");
for (let i = 0; i < arreglo.length; i++) {
    console.log(arreglo[i].mostrarResumen());
    if (arreglo[i].activa) {
        console.log("Esta Activa");
    } else {
        console.log("Esta No Esta Activa");
    }
    console.log("-------------------");
}

// Agregar nueva venta en vez de Publicacion padre(de la clase padre)
arreglo.push(new PublicacionVenta("Pesto", "sin tac", usuario3, 1200));
arreglo[4].activa = false;

// Contador de activas
let contador = 0;
for (let l = 0; l < arreglo.length; l++) {
    if (arreglo[l].activa) {
        contador++;
        console.log(arreglo[l].titulo);
        console.log("--------------");
    }
}
console.log("Total activas:", contador);

// Búsqueda por autor
console.log("------------------");
console.log("Voy a ver que publicaciones tienen el nombre: carniceria borjes");
for (let m = 0; m < arreglo.length; m++) {
    if (arreglo[m].esDeAutor("carniceria borjes")) {
        console.log("El arreglo tiene de autor: " + arreglo[m].autor.nombre);
        console.log("Coincide con el nombre de autor pasado");
    }
}

// Métodos de array
console.log("-------Usando forEach-----------");
arreglo.forEach(publicacion => {
    console.log(publicacion.mostrarResumen());
});

console.log("-------Usando filter-----------");
const activos = arreglo.filter(publicacion => publicacion.activa);
activos.forEach(activa => {
    console.log("Publicación activa: " + activa.titulo);
});

console.log("-------Usando find-----------");
const publicacionActiva = arreglo.find(elemento => elemento.activa);
console.log("Primera activa:", publicacionActiva?.titulo); //con el signo "?" pregunto si es un objeto valido, y si lo es pregunto el titulo, de esa forma evita hacer el chequeo en otra linea


// Referencia de objetos
console.log("--- Cambiando email de usuario1 ---");
usuario1.email = "cambieElEmail@gmail.com";
console.log(arreglo[0].autor.email);
console.log(arreglo[2].autor.email);

// Parte 4: Repositorio
let publicacionesArreglo = new RepositorioPublicaciones();
arreglo.forEach(p => publicacionesArreglo.agregar(p));

let publicacionesConUsuario = publicacionesArreglo.buscarPorUsuario("carniceria borjes");
console.log("Coincidencias con carniceria borjes:", publicacionesConUsuario.length);

let publicacionesActivasRepo = publicacionesArreglo.filtrarActivas();
console.log("Activas en repositorio:", publicacionesActivasRepo.length);
console.log("Cantidad total:", publicacionesArreglo.cantidadTotal());