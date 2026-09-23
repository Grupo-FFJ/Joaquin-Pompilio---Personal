// --- 1. Elementos del DOM ---
const vistaPrevia = document.getElementById("vista-previa");
const titulo = document.getElementById("titulo");
const autor = document.getElementById("autor");
const email = document.getElementById("email");
const tipo = document.getElementById("tipo");
const descripcion = document.getElementById("descripcion");
const camposEspecificos = document.getElementById("campos-especificos");
const ayudaEmail = document.getElementById("ayuda-email");
const formulario = document.getElementById("form-publicacion");
const errorTitulo = document.getElementById("error-titulo");
const errorAutor = document.getElementById("error-autor");
const enviar = formulario ? formulario.querySelector("button") : null;

// Elementos nuevos de la Clase 15
const botonConsultar = document.querySelector("#consultar");
const parrafoEstado = document.querySelector("#estado-comunidad");
const botonInactivas = document.querySelector("#consultar-inactivas");
const parrafoEstadoComunidad = document.querySelector("#estado-inactivas");

// --- 2. Vista previa y validaciones del Cliente ---
function actualizarVistaPrevia() {
  if (!vistaPrevia || !titulo || !autor || !tipo) return;
  const textoTitulo = titulo.value.trim() || "Sin título";
  const textoAutor = autor.value.trim() || "...";
  vistaPrevia.textContent = `${textoTitulo} — ${textoAutor} (${tipo.value})`;
}

function actualizarCamposEspecificos() {
  if (!camposEspecificos || !tipo) return;
  if (tipo.value === "venta") {
    camposEspecificos.innerHTML = `
      <input id="precio" type="number" placeholder="Precio">
      <small id="error-precio" class="error"></small>
      <input id="stock" type="number" value="1">
    `;
    const inputPrecio = document.getElementById("precio");
    if (inputPrecio) {
      inputPrecio.addEventListener("input", () => validarPrecio(false));
      inputPrecio.addEventListener("blur", () => validarPrecio(true));
    }
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

function validarTitulo(mostrarError = true) {
  if (!titulo) return false;
  const valido = titulo.value.trim().length >= 5;
  titulo.classList.toggle("valido", valido);
  titulo.classList.toggle("invalido", !valido && mostrarError);
  if (errorTitulo) {
    errorTitulo.textContent =
      !valido && mostrarError ? "Ingrese al menos 5 caracteres" : "";
  }
  return valido;
}

function validarAutor(mostrarError = true) {
  if (!autor) return false;
  const valido = autor.value.trim().length >= 3;
  autor.classList.toggle("valido", valido);
  autor.classList.toggle("invalido", !valido && mostrarError);
  if (errorAutor) {
    errorAutor.textContent =
      !valido && mostrarError ? "Ingrese al menos 3 caracteres" : "";
  }
  return valido;
}

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

function formularioValido() {
  const inputPrecio = document.getElementById("precio");
  const precioValido =
    tipo?.value !== "venta" || (inputPrecio && Number(inputPrecio.value) > 0);
  return (
    titulo?.value.trim().length >= 5 &&
    autor?.value.trim().length >= 3 &&
    precioValido
  );
}

function actualizarEstadoFormulario() {
  if (enviar) {
    enviar.disabled = !formularioValido();
  }
}

// Listeners de UI
if (titulo && autor && tipo) {
  [titulo, autor, tipo].forEach((control) =>
    control.addEventListener("input", actualizarVistaPrevia),
  );
  tipo.addEventListener("change", () => {
    actualizarCamposEspecificos();
    actualizarVistaPrevia();
    actualizarEstadoFormulario();
  });
  titulo.addEventListener("input", () => {
    validarTitulo(false);
    actualizarEstadoFormulario();
  });
  titulo.addEventListener("blur", () => validarTitulo(true));
  autor.addEventListener("input", () => {
    validarAutor(false);
    actualizarEstadoFormulario();
  });
  autor.addEventListener("blur", () => validarAutor(true));
  actualizarCamposEspecificos();
  actualizarEstadoFormulario();
}
//PRACTICA 16 - parte 4
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const respuesta = await fetch(formulario.action, {
    method: formulario.method,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(new FormData(formulario)),
  });
  salida.textContent = await respuesta.text();
  salida.dataset.tipo = respuesta.ok ? "exito" : "error";
  if (respuesta.ok) formulario.reset();
});

// --- 3. Consulta al Servidor (Parte 3 del TP 15) ---
if (botonConsultar && parrafoEstado) {
  botonConsultar.addEventListener("click", async () => {
    parrafoEstado.textContent = "Consultando...";
    try {
      const respuesta = await fetch("/estado-comunidad");
      if (!respuesta.ok) {
        throw new Error("La respuesta no fue exitosa");
      }
      const texto = await respuesta.text();
      parrafoEstado.textContent = texto;
    } catch (error) {
      parrafoEstado.textContent = `No se pudo consultar el estado: ${error.message}`;
    }
  });
}

if (botonInactivas) {
  botonInactivas.addEventListener("click", async () => {
    parrafoEstadoComunidad.textContent = "Consultando...";
    try {
      const respuesta = await fetch("/estado-inactivas"); //disparo otra ruta
      if (!respuesta.ok) {
        throw new Error("La respuesta no fue exitosa");
      }
      const texto = await respuesta.text();
      parrafoEstadoComunidad.textContent = texto;
    } catch (error) {
      parrafoEstadoComunidad.textContent = `No se pudo consultar el estado: ${error.message}`;
    }
  });
}

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const respuesta = await fetch(formulario.action, {
    method: formulario.method,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(new FormData(formulario)),
  });
  salida.textContent = await respuesta.text();
  salida.dataset.tipo = respuesta.ok ? "exito" : "error";
  if (respuesta.ok) formulario.reset();
});
//Parte 4 · Envío controlado desde el cliente - tp 16
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const respuesta = await fetch(formulario.action, {
    method: formulario.method,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(new FormData(formulario)),
  });
  salida.textContent = await respuesta.text();
  salida.dataset.tipo = respuesta.ok ? "exito" : "error";
  if (respuesta.ok) formulario.reset();
});
