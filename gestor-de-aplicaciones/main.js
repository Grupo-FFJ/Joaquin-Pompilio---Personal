import { Publicacion } from "./publicacion.js";
import { Usuario } from "./usuario.js";
import { RepositorioPublicaciones } from "./RepositorioPublicaciones.js";
import { PublicacionVenta } from "./publicacionVenta.js"
import { PublicacionServicio } from "./publicacionServicio.js"
import { Regla } from "./regla.js"
import { validarPublicacion } from "./validaciones.js"

let usuario1 = new Usuario("carniceria borjes", "asda@jimijimol.com")
let usuario2 = new Usuario("carniceria milan", "asda@jimijimol.com")
let usuario3 = new Usuario("carniceria borjes", "asda@jimijimol.com")


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


console.log("-------------------------------")
console.log("---------Probando Agregar y buscar Por usuario----------")
console.log("///////////Cree otro repositorio de publicaiones para probar///////////")
const repo = new RepositorioPublicaciones();
//agregando eventos
repo.on("publicacionAgregada", (p) => {
    console.log(`Nueva publicación: ${p.mostrarResumen()}`);
});
let cont = 0;
repo.on("publicacionAgregada", () => {
    cont++;
    console.log(`Van ${cont} publicaciones en total`);
});
 // dispara los dos listeners, en orden



// Un mismo usuario con publicaciones de venta y servicio
const usuario4 = new Usuario("carniceria borjes", "borjes@test.com");
const usuario5 = new Usuario("Juan Lopez", "juan@test.com");

// agregando publicaiones con agregar()
repo.agregar(new PublicacionVenta("Hamburguesa Vegana", "Sin soja", usuario4, 1200));
repo.agregar(new PublicacionServicio("Corte de Pelo", "A domicilio", usuario4, "Presencial", 45));
repo.agregar(new PublicacionVenta("Pizzetas", "Integrales", usuario5, 800));
repo.agregar(new PublicacionServicio("Clase de Programacion", "JS Avanzado", usuario4, "Online", 60));

console.log("--- Buscar por usuario: carniceria borjes ---");
const publicacionesBorjes = repo.buscarPorUsuario("carniceria borjes");
console.log(`Encontradas: ${publicacionesBorjes.length}`);
publicacionesBorjes.forEach(pub => console.log(`- ${pub.titulo} (${pub.constructor.name})`)); //pub.constructor.name == esto devuelve el nombre de la clase a la que llama

// 3. Probar el desafío: listarPorTipo()
console.log("--- Solo PublicacionVenta ---");
const soloVentas = repo.listarPorTipo(PublicacionVenta);
soloVentas.forEach(pub => console.log(`- ${pub.titulo} | Precio: $${pub.precio}`));

console.log("--- Solo PublicacionServicio ---");
const soloServicios = repo.listarPorTipo(PublicacionServicio);
soloServicios.forEach(pub => console.log(`- ${pub.titulo} | Modalidad: ${pub.modalidad}`));
/*
Autoevaluación de cierre
Respondan individualmente antes de guardar su trabajo:
● ¿Qué le pasa a PublicacionVenta si Publicacion agrega mañana un nuevo atributo en
su constructor?
heredara ese nuevo atributo, pero para poder darle un valor al instanciarla, habra que actualizar su propio constructor agregando ese parametro y pasandolo dentro de la llamada a super(..)

● ¿Qué diferencia hay entre agregar un atributo directamente en PublicacionVenta y
agregarlo en Publicacion?
en publicacion, el atributo pasa a ser compartido por todas las subclases, mientras que en PublicionVenta, el atributo es solo de esa clase y sus hijos.

● ¿Qué me quedó menos claro de esta clase? */
//el uso de instanceoff, super() y la diferencia entre declarar atributos y usarlos con this

/*En main.js, recorran el array mixto de publicaciones con un solo forEach, sin ningún if ni
instanceof: */
console.log("----------------------------------")
repo.arreglo.forEach(p => console.log(p.mostrarResumen()))

console.log(repo.listaResumenes())
console.log(repo.filtrarPorTipo(PublicacionVenta))

console.log("----------------------------------")
console.log("-------------COMPROBANDO REGLAS----------------")
const regla = new Regla(2, 50, 2)
console.log(validarPublicacion(repo.arreglo[2], regla))

//Agregando eventos con delay
repo.publicarConDemora(new PublicacionVenta("Hamburguesa Vegana", "Sin soja", usuario4, 1200),console.log);
//anda, pero tengo sacar el import: import { setTimeout } from "node:timers/promises"; de repositorioPublicaciones
