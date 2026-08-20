import { Publicacion } from "./publicacion.js";
let arreglo = [
    new Publicacion("chorizo", "vegano", "carniceria borjes"),
    new Publicacion("fideos", "vegano", "churreria magnolia"),
    new Publicacion("morcilla", "vegano", "carniceria borjes"),
    new Publicacion("carne", "semi-vegano", "carniceria borjes")
]

arreglo[0].titulo = "fui modificado, Hamburguesa"
arreglo[0].activa = false
arreglo[2].descripcion = "fui modificado, tengo gluten"
arreglo[2].descripcion = "fui modificado, no soy vegano"
arreglo[3].autor = "antes era borjes, ahora soy borja"

for (let i =0; i<arreglo.length; i++){
    console.log(arreglo[i].mostrarResumen())
    if (arreglo[i].activa) {
      console.log("Esta Activa")
    } else {
        console.log("Esta No Esta Activa")
    }
    console.log("-------------------")
}

arreglo.push(new Publicacion("Pesto","sin tac","Maximo Asimov"))
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

//VERIFICACIÓN · Antes de seguir
//¿El resumen que imprime cada objeto usa sus propios datos y no los de otro? Prueben cambiar el título de una publicación después de creada y confirmen que solo esa cambia.
//Si, solo eso pasa 
console.log("--------{{{{{{{{{{}}}}}}}}}--------")
const publicacionesJSON = JSON.stringify(arreglo, null, 2);
console.log(publicacionesJSON);
//Los metodos se pierden, por JSON.stringify(), ignora los metodos,y se queda solo con los atributos

console.log("------------------")
console.log("Voy a ver que publicaciones tienen el nombre: carniceria borjes")
for (let m=0; m<arreglo.length; m++) {
    if (arreglo[m].esDeAutor("carniceria borjes")) {
        console.log("El arreglo tiene de autor: "+arreglo[m].autor)
        console.log("Coincide con el nombre de autor pasado")
    }
}
/*
Respondan individualmente antes de guardar su trabajo:
    • ¿Qué le pasaría a mi código si mañana necesito agregar un atributo categoría a todas las publicaciones?
    Tendria que agregar esa categoria en el constructor y inicializarlo en alguna instancia
    • ¿En qué parte de mi clase Publicación se ve el encapsulamiento?
    Se ve encapsulamiento en los atributos: titulo, descripcion y autor
    • ¿Qué me quedó menos claro de esta clase?
*/