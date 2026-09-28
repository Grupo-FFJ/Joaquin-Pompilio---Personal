// PASO 1: completar qué propiedades son públicas.

import { json } from "express";

// Pista: mirá qué expone mostrarResumen() y qué usa el cliente hoy.
export function paraExponer(publicacion) {
  return {
    id: publicacion.id,
    autor: publicacion.autor,
    titulo: publicacion.titulo,
    contenido: publicacion.descripcion,
    categoria: publicacion.categoria,
    activa: publicacion.activa,
    etiquetas: publicacion.etiquetas,
    estado: publicacion.estado
    // ... completar: titulo, contenido, categoria, activa, etiquetas, estado
    // reportes NO va acá
  };
}

export function convertirAJSON(publicaciones) {
  // PASO 2A: publicaciones.map(paraExponer) y JSON.stringify
  return JSON.stringify(publicaciones.map(paraExponer))
}
export function convertirDesdeJSON(texto) {
  // PASO 2B: JSON.parse
  return JSON.parse(texto);
}

function escaparXML(valor) {
  // PASO 3A: reemplazar &, <, >, " y ' por sus entidades
  // (&amp; &lt; &gt; &quot; &apos;), en ese orden
  if (valor === null || valor === undefined) return '';
  return String(valor)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function publicacionAXML(publicacion) {
  // PASO 3B: construir <publicacion id="...">...<etiquetas>...</etiquetas></publicacion>
  // usando escaparXML en cada valor de texto
  const idAttr = escaparXML(publicacion.id);
  const titulo = escaparXML(publicacion.titulo);
  const autor = escaparXML(publicacion.autor);

  // Si tiene etiquetas (array), mapeamos cada una dentro de <etiquetas>
  // (o adaptalo según las propiedades que tenga la clase/objeto en tu práctico)
  const etiquetasXML = Array.isArray(publicacion.etiquetas)
    ? publicacion.etiquetas.map(e => `<etiqueta>${escaparXML(e)}</etiqueta>`).join('')
    : (publicacion.etiquetas ? escaparXML(publicacion.etiquetas) : '');

  return (
    `<publicacion id="${idAttr}">` +
      `<titulo>${titulo}</titulo>` +
      `<autor>${autor}</autor>` +
      `<etiquetas>${etiquetasXML}</etiquetas>` +
    `</publicacion>`
  );
}

export function convertirAXML(publicaciones) {
  // PASO 3C: envolver todos los <publicacion> dentro de <publicaciones>
  // sin olvidar el encabezado <?xml version="1.0" encoding="UTF-8"?>
  const publicacionesXML = publicaciones.map(publicacionAXML).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><publicaciones>${publicacionesXML}</publicaciones>`;
}
