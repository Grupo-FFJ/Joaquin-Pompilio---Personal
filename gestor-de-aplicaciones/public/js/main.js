/*import { Publicacion } from "./publicacion.js";
import { Usuario } from "./usuario.js";
import { RepositorioPublicaciones } from "./RepositorioPublicaciones.js";
import { PublicacionVenta } from "./publicacionVenta.js";
import { PublicacionServicio } from "./publicacionServicio.js";
import { Regla } from "./regla.js";
import { validarPublicacion } from "./validaciones.js";
*/

//ACTIVAS
import { Usuario } from "./usuario.js";
import { PublicacionVenta } from "./publicacionVenta.js";
import { PublicacionServicio } from "./publicacionServicio.js";

let vistaPrevia = document.getElementById("vista-previa");
//parte 2
const titulo = document.getElementById("titulo");
const tipo = document.getElementById("tipo");

function observarEvento(evento) {
  console.log("estoy adentro de observar evento");
  console.table({
    type: evento.type,
    target: evento.target.id,
    currentTarget: evento.currentTarget.id,
    timeStamp: Math.round(evento.timeStamp),
  });
}
titulo.addEventListener("input", observarEvento);
tipo.addEventListener("change", observarEvento);

function actualizarVistaPrevia() {
  const nombre = autor.value || "Autor";
  const texto = titulo.value || "Sin título";
  vistaPrevia.textContent = `${texto} — ${nombre} (${tipo.value})`;
}
titulo.addEventListener("change", actualizarVistaPrevia);
autor.addEventListener("input", actualizarVistaPrevia);
tipo.addEventListener("change", actualizarVistaPrevia);

//parte 4 -- USO DE CHANGE PARA ADAPTAR EL FORMULARIO
const camposEspecificos = document.getElementById("campos-especificos");
function actualizarCamposEspecificos() {
  if (tipo.value === "venta") {
    camposEspecificos.innerHTML = `
<input id="precio" type="number" placeholder="Precio">
<input id="stock" type="number" value="1">`;
  } else {
    camposEspecificos.innerHTML = `
<select id="modalidad">
<option>presencial</option><option>virtual</option>
</select>
<input id="duracion" type="number" placeholder="Minutos">`;
  }
}
tipo.addEventListener("change", actualizarCamposEspecificos);
actualizarCamposEspecificos();

//parte 5
const ayudaEmail = document.getElementById("ayuda-email");
function mostrarAyudaEmail() {
  ayudaEmail.textContent = "Usá un email válido del autor";
}
function ocultarAyudaEmail() {
  ayudaEmail.textContent = "";
  console.log("funcion ocultarAyudaEmail");
}
email.addEventListener("focus", mostrarAyudaEmail);
email.addEventListener("blur", ocultarAyudaEmail);

//Parte 6 y 7

const lista_publicaciones = document.getElementById("lista-publicaciones")
let cont = 0
function agregarTarjeta(publicacion) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta");
  tarjeta.dataset.id = cont 
  tarjeta.addEventListener("click", () => {
    console.log("-> Click detectado en la TARJETA  id: " , tarjeta.dataset.id);
  });
  cont ++


  const titulo = document.createElement("h3");
  titulo.textContent = publicacion.titulo;

  const descripcion = document.createElement("p");
  descripcion.textContent = publicacion.descripcion;

  const estado = document.createElement("p");
  
  estado.textContent = publicacion.activa ? "Activa" : "Inactiva";
  
  const botonDestacar = document.createElement("button")git
  botonDestacar.dataset.accion = "destacar"
  botonDestacar.textContent = "destacar"

  const botonDarDeBaja = document.createElement("button");
  botonDarDeBaja.dataset.accion = "baja"
  botonDarDeBaja.textContent = "Dar de baja";
 
  function manejarBaja(evento) {
  evento.stopPropagation()
    console.log(evento.type, evento.target);
    publicacion.darDeBaja();
    estado.textContent = "Inactiva";
    botonDarDeBaja.disabled = true;
  }
  botonDarDeBaja.addEventListener("click", manejarBaja);

  tarjeta.append(titulo, descripcion, estado, botonDarDeBaja, botonDestacar);
  lista_publicaciones.appendChild(tarjeta);
}

const formulario = document.getElementById("form-publicacion");
const publicaciones = [];
function crearPublicacionDesdeFormulario() {
  const usuario = new Usuario(autor.value, email.value);
  if (tipo.value === "venta") {
    return new PublicacionVenta(
      titulo.value,
      descripcion.value,
      usuario,
      Number(document.querySelector("#precio").value),
    );
  }
  return new PublicacionServicio(
    titulo.value,
    descripcion.value,
    usuario,
    document.querySelector("#modalidad").value,
    Number(document.querySelector("#duracion").value),
  );
}
//parte 4 - tp9
function manejarEnvio(evento) {
  evento.preventDefault();
  const publicacion = crearPublicacionDesdeFormulario();
  publicaciones.push(publicacion);
  agregarTarjeta(publicacion);
  formulario.reset();
  actualizarCamposEspecificos();
  actualizarVistaPrevia();
}
formulario.addEventListener("submit", manejarEnvio);


//practico 9
/*
Hagan clic en una tarjeta, en su texto y en su botón.
 Registren qué cambia y qué permanece igual.
Cambia cuando toco un elemento, como un parrafo, un h3, o un boton
 Quiten el listener con removeEventListener() y verifiquen la consola
*/

/*function observarClick(evento) {
console.log("target", evento.target);
console.log("currentTarget", evento.currentTarget);
}
lista_publicaciones.addEventListener("click", observarClick); */

function manejarAccion(evento) {
console.log("estoy adentro")
const boton = evento.target.closest("button[data-accion]");
if (!boton || !lista_publicaciones.contains(boton)) return;
const tarjeta = boton.closest("[data-id]");
const id = Number(tarjeta.dataset.id);
console.log(id, boton.dataset.accion);
}
lista_publicaciones.addEventListener("click", manejarAccion);
