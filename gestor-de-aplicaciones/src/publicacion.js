import { Reporte } from "./Reporte.js";

export class Publicacion {
  //es para los types
  titulo;
  descripcion;
  autor;
  fechaPublicacion;
  activa;
  //
  constructor(titulo, descripcion, autor) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.autor = autor; //es un objeto tipo usuario
    this.fechaPublicacion = new Date();
    this.activa = true;
    this.destacado = false;
    this.etiquetas = [];
    this.reportes = [];
    this.estado = "pendiente";
  }
  mostrarResumen() {
    return this.titulo + " " + this.descripcion + " " + this.autor.nombre;
  }
  estaActiva() {
    return this.activa;
  }
  esDeAutor(nombre) {
    return this.autor.nombre === nombre;
  }
  diasPublicada() {
    const ms = new Date() - this.fechaPublicacion;
    return Math.floor(ms / (1000 * 60 * 60 * 24)); // lo paso a dias y redondea para abajo con floor (investigar)
  }
  darDeBaja() {
    this.activa = false;
  }
  destacar() {
    this.destacado = !this.destacado;
  }

  get resumen() {
    const estadoTexto = this.activa ? "Activa" : "Inactiva";
    const nombreAutor = this.usuario ? this.usuario.nombre : "Sin autor";
    return `${nombreAutor} — ${this.titulo} (${estadoTexto})`;
  }
  agregarEtiqueta(etiqueta) {
    const normalizada = etiqueta.trim();
    if (!normalizada) {
      throw new Error("Etiqueta inválida");
    }
    const yaExiste = this.tieneEtiqueta(normalizada);
    if (!yaExiste) {
      this.etiquetas.push(normalizada);
    }
  }
  tieneEtiqueta(etiqueta) {
    const buscada = etiqueta.trim().toLowerCase();
    return this.etiquetas.some((e) => e.toLowerCase() === buscada);
  }
  //parte 2
  reportar(usuario, motivo) {
    const yaReporto = this.reportes.some((r) => r.usuario === usuario);
    if (yaReporto) {
      throw new Error("El usuario ya reportó esta publicación");
    }
    this.reportes.push(new Reporte(usuario, motivo));
  }
  requiereRevision() {
    return this.reportes.length >= 3;
  }
  async revisar(servicioModeracion) {
    const decision = await servicioModeracion.evaluar(this);
    if (decision === "aprobado") {
      this.estado = "aprobada";
    } else if (decision === "rechazado") {
      this.estado = "rechazada";
    } else {
      throw new Error("Decisión de moderación inválida");
    }
    return this.estado;
  }
}
