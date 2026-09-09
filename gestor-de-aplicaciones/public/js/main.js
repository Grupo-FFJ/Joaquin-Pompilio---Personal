import { Usuario } from "./usuario.js";
import { Publicacion } from "./publicacion.js";
import { PublicacionVenta } from "./publicacionVenta.js";
import { PublicacionServicio } from "./publicacionServicio.js";
import { RepositorioPublicaciones } from "./RepositorioPublicaciones.js";

const repositorio = new RepositorioPublicaciones();

const vistaPrevia = document.getElementById("vista-previa");
const titulo = document.getElementById("titulo");
const autor = document.getElementById("autor");
const email = document.getElementById("email");
const tipo = document.getElementById("tipo");
const descripcion = document.getElementById("descripcion");
const camposEspecificos = document.getElementById("campos-especificos");
const ayudaEmail = document.getElementById("ayuda-email");
const formulario = document.getElementById("form-publicacion");
const lista_publicaciones = document.getElementById("lista-publicaciones");
const botonActualizar = document.getElementById("btn-actualizar");
const estado = document.getElementById("estado");
const botonForzarError = document.getElementById("btn-forzar-error");
const enviar = formulario.querySelector("button");

botonForzarError.addEventListener("click", () => {
  cargarPublicaciones(true);
});

let cont = 0;

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

// Vista previa usando el getter resumen del dominio
function actualizarVistaPrevia() {
  // 1. Actualiza el contador de caracteres de la descripción
  if (contador && descripcion) {
    contador.textContent = descripcion.value.length;
  }

  // 2. Genera el texto previo usando los valores actuales
  const textoTitulo = titulo.value.trim() || "Sin título";
  const textoAutor = autor.value.trim() || "...";
  vistaPrevia.textContent = `${textoTitulo} — ${textoAutor} (${tipo.value})`;
}

// Suscripción de todos los controles relevantes al evento 'input'
[titulo, autor, descripcion, tipo].forEach(control => {
  control.addEventListener("input", actualizarVistaPrevia);
});

// Para el <select>, 'change' asegura la respuesta inmediata en todos los navegadores
titulo.addEventListener("input", actualizarVistaPrevia);
autor.addEventListener("input", actualizarVistaPrevia);
tipo.addEventListener("change", actualizarVistaPrevia);

// Adaptación de campos según el tipo seleccionado
function actualizarCamposEspecificos() {
  if (tipo.value === "venta") {
    camposEspecificos.innerHTML = `
      <input id="precio" type="number" placeholder="Precio">
      <small id="error-precio" class="error"></small>
      <input id="stock" type="number" value="1">
    `;
    const inputPrecio = document.getElementById("precio");
    inputPrecio.addEventListener("input", () => validarPrecio(false));
    inputPrecio.addEventListener("blur", () => validarPrecio(true));
  } else {
    camposEspecificos.innerHTML = `
      <select id="modalidad">
        <option>presencial</option>
        <option>virtual</option>
      </select>
      <input id="duracion" type="number" placeholder="Minutos">
    `;
  }
}
tipo.addEventListener("change", actualizarCamposEspecificos);
actualizarCamposEspecificos();

// Mensajes de ayuda
function mostrarAyudaEmail() {
  ayudaEmail.textContent = "Usá un email válido del autor";
}
function ocultarAyudaEmail() {
  ayudaEmail.textContent = "";
}
email.addEventListener("focus", mostrarAyudaEmail);
email.addEventListener("blur", ocultarAyudaEmail);

// Renderizado de tarjetas individuales
function agregarTarjeta(publicacion) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta");
  tarjeta.dataset.id = cont;
  cont++;

  const tituloElem = document.createElement("h3");
  tituloElem.textContent = publicacion.titulo;

  const descripcionElem = document.createElement("p");
  descripcionElem.textContent = publicacion.descripcion;

  const estadoElem = document.createElement("p");
  estadoElem.classList.add("estado");
  estadoElem.textContent = publicacion.activa ? "Activa" : "Inactiva";

  const botonDestacar = document.createElement("button");
  botonDestacar.dataset.accion = "destacar";
  botonDestacar.textContent = "Destacar";

  const botonDarDeBaja = document.createElement("button");
  botonDarDeBaja.dataset.accion = "baja";
  botonDarDeBaja.textContent = "Dar de baja";
  if (!publicacion.activa) {
    botonDarDeBaja.disabled = true;
  }

  tarjeta.append(
    tituloElem,
    descripcionElem,
    estadoElem,
    botonDarDeBaja,
    botonDestacar,
  );
  lista_publicaciones.appendChild(tarjeta);
}

// Renderiza todas las publicaciones presentes en el repositorio
function renderizarPublicaciones() {
  lista_publicaciones.innerHTML = "";
  cont = 0;
  repositorio.todas().forEach((pub) => {
    agregarTarjeta(pub);
  });
}

// Creación de instancias según formulario
function crearPublicacionDesdeFormulario() {
  const usuario = new Usuario(autor.value, email.value);
  if (tipo.value === "venta") {
    const precio = Number(document.querySelector("#precio").value);
    return new PublicacionVenta(
      titulo.value,
      descripcion.value,
      usuario,
      precio,
    );
  }
  const modalidad = document.querySelector("#modalidad").value;
  const duracion = Number(document.querySelector("#duracion").value);
  return new PublicacionServicio(
    titulo.value,
    descripcion.value,
    usuario,
    modalidad,
    duracion,
  );
}

// Envío del formulario
/*function manejarEnvio(evento) {
  evento.preventDefault();

  const esTituloValido = validarTitulo(true);
  const esAutorValido = validarAutor(true);
  const esPrecioValido = tipo.value === "venta" ? validarPrecio(true) : true;

  // Si alguno no es válido, se cancela el guardado
  if (!esTituloValido || !esAutorValido || !esPrecioValido) {
    return;
  }

  const publicacion = crearPublicacionDesdeFormulario();
  repositorio.agregar(publicacion);
  renderizarPublicaciones();

  formulario.reset();
  actualizarCamposEspecificos();
  actualizarVistaPrevia();
}
formulario.addEventListener("submit", manejarEnvio); */ //POR LA PARTE 7 

// Delegación de eventos sobre la lista de publicaciones
function manejarAccion(evento) {
  const boton = evento.target.closest("button[data-accion]");
  if (!boton || !lista_publicaciones.contains(boton)) return;

  const tarjeta = boton.closest("[data-id]");
  const id = Number(tarjeta.dataset.id);
  const publicacion = repositorio.todas()[id];

  if (!publicacion) return;

  const accion = boton.dataset.accion;

  if (accion === "baja") {
    publicacion.darDeBaja();
    const parrafoEstado = tarjeta.querySelector(".estado");
    if (parrafoEstado) {
      parrafoEstado.textContent = "Inactiva";
    }
    boton.disabled = true;
  } else if (accion === "destacar") {
    publicacion.destacar();
    tarjeta.classList.toggle("destacada");
  }
}
lista_publicaciones.addEventListener("click", manejarAccion);

// Helper de simulación de espera
function esperar(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Carga asíncrona de publicaciones
/*async function cargarPublicaciones() {
  try {
    estado.textContent = "Cargando publicaciones...";
    botonActualizar.disabled = true;

    const respuesta = await fetch("/api/publicaciones");
    if (!respuesta.ok) {
      throw new Error("La respuesta no fue exitosa");
    }

    const datos = await respuesta.json();
    repositorio.cargarDesde(datos);
    renderizarPublicaciones();

    estado.textContent = `${datos.length} publicaciones recibidas`;
  } catch (error) {
    console.error(error);
    estado.textContent = `Error al cargar: ${error.message}`;
  } finally {
    botonActualizar.disabled = false;
  }
}*/
async function cargarPublicaciones(forzarError = false) {
  estado.textContent = "Cargando publicaciones...";
  botonActualizar.disabled = true;
  try {
    const url = forzarError
      ? "/api/publicaciones?error=1"
      : "/api/publicaciones";
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error("La respuesta no fue exitosa");
    const datos = await respuesta.json();
    repositorio.cargarDesde(datos);
    renderizarPublicaciones();
    estado.textContent = `${datos.length} publicaciones recibidas`;
  } catch (error) {
    estado.textContent = `Error: ${error.message}`;
  } finally {
    botonActualizar.disabled = false;
  }
}
botonActualizar.addEventListener("click", () => cargarPublicaciones(false));

//parte 4
const errorTitulo = document.getElementById("error-titulo");
const errorAutor = document.getElementById("error-autor");

function validarTitulo(mostrarError = true) {
  const valido = titulo.value.trim().length >= 5;
  titulo.classList.toggle("valido", valido);
  titulo.classList.toggle("invalido", !valido && mostrarError);
  errorTitulo.textContent =
    !valido && mostrarError ? "Ingrese al menos 5 caracteres" : "";
  return valido;
}
titulo.addEventListener("input", () => validarTitulo(false));
titulo.addEventListener("blur", () => validarTitulo(true));

// Validación: Autor (mínimo 3 caracteres)
function validarAutor(mostrarError = true) {
  const valido = autor.value.trim().length >= 3;
  autor.classList.toggle("valido", valido);
  autor.classList.toggle("invalido", !valido && mostrarError);
  errorAutor.textContent =
    !valido && mostrarError ? "Ingrese al menos 3 caracteres" : "";
  return valido;
}
autor.addEventListener("input", () => validarAutor(false));
autor.addEventListener("blur", () => validarAutor(true));

// Validación: Precio (mayor a 0, solo para tipo 'venta')
function validarPrecio(mostrarError = true) {
  const inputPrecio = document.getElementById("precio");
  const errorPrecio = document.getElementById("error-precio");
  if (!inputPrecio) return true;

  const valor = Number(inputPrecio.value);
  const valido = valor > 0 && !isNaN(valor);

  inputPrecio.classList.toggle("valido", valido);
  inputPrecio.classList.toggle("invalido", !valido && mostrarError);
  if (errorPrecio) {
    errorPrecio.textContent =
      !valido && mostrarError ? "El precio debe ser mayor a 0" : "";
  }
  return valido;
}

//parte 6
function formularioValido() {
  const inputPrecio = document.getElementById("precio");
  const precioValido = tipo.value !== "venta" || (inputPrecio && Number(inputPrecio.value) > 0);
  return (
    titulo.value.trim().length >= 5 &&
    autor.value.trim().length >= 3 &&
    precioValido
  );
}

function actualizarEstadoFormulario() {
  if (enviar) {
    enviar.disabled = !formularioValido();
  }
}

formulario.addEventListener("input", actualizarEstadoFormulario);
tipo.addEventListener("change", actualizarEstadoFormulario);

// Estado inicial al cargar la página
actualizarEstadoFormulario();
//parte 7
async function manejarEnvio(evento) {
evento.preventDefault();
if (!validarTitulo(true)) return;
enviar.disabled = true;
estado.textContent = "Publicando...";
try {
await esperar(800);
const publicacion = crearPublicacionDesdeFormulario();
repositorio.agregar(publicacion);
renderizarPublicaciones();
estado.textContent = "Publicación agregada";
formulario.reset();
actualizarVistaPrevia();
} catch (error) {
estado.textContent = `Error: ${error.message}`;
} finally {
actualizarEstadoFormulario();
}
}
formulario.addEventListener("submit", manejarEnvio);
