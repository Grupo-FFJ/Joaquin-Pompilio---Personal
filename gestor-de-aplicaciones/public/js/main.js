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

function agregarTarjeta(publicacion) {

  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta");

  const titulo = document.createElement("h3");
  titulo.textContent = publicacion.titulo;

  const descripcion = document.createElement("p");
  descripcion.textContent = publicacion.descripcion;

  const estado = document.createElement("p");
  estado.textContent = publicacion.activa ? "Activa" : "Inactiva";

  const boton = document.createElement("button");
  boton.textContent = "Dar de baja";
  function manejarBaja(evento) {
    console.log(evento.type, evento.target);
    publicacion.darDeBaja();
    estado.textContent = "Inactiva";
    boton.disabled = true;
  }
  boton.addEventListener("click", manejarBaja);

  tarjeta.append(titulo, descripcion, estado, boton);
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

//parte 8
/*function manejarBaja(evento) {
publicacion.activa = false;
estado.textContent = "Inactiva";
}
boton.addEventListener("click", manejarBaja());
boton.addEventListener("click", manejarBaja);
boton.addEventListener("click", manejarBaja); */

/* 
PROBLEMA 1: boton.addEventListener("click", manejarBaja());, ejecuta el la funcion, apenas carga el navegador 
PROBLEMA 2: Se llama 3 veces a addEventListener 
PROBLEMA 3: altera directamente el atributo interno del modelo de dominio, violando el principio de encapsulamiento de POO
(deberia ser: publicacion.darDeBaja(), NOOO: publicacion.activa = false;) 
*/