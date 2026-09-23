import { Reporte } from "./Reporte.js";

export const CATEGORIAS_PERMITIDAS = [
  "general",
  "aviso",
  "evento",
  "compraventa",
];

export class Publicacion {
  // Types / propiedades de clase
  id;
  titulo;
  descripcion;
  autor;
  categoria;
  fechaPublicacion;
  activa;
  destacado;
  etiquetas;
  reportes;
  estado;

  constructor(autor, titulo, descripcion, categoria = "general") {
    // 1. Convertir y validar
    if (typeof autor !== "string" || !autor.trim()) {
      throw new Error("El autor es obligatorio");
    }

    const tituloNormalizado = typeof titulo === "string" ? titulo.trim() : "";
    if (tituloNormalizado.length < 5 || tituloNormalizado.length > 80) {
      throw new Error("El título debe tener entre 5 y 80 caracteres");
    }

    const descripcionNormalizado =
      typeof descripcion === "string" ? descripcion.trim() : "";
    if (
      descripcionNormalizado.length < 20 ||
      descripcionNormalizado.length > 500
    ) {
      throw new Error("La descripcion debe tener entre 20 y 500 caracteres");
    }

    if (!CATEGORIAS_PERMITIDAS.includes(categoria)) {
      throw new Error(
        `La categoría debe ser una de: ${CATEGORIAS_PERMITIDAS.join(",")}`
      );
    }

    // 2. Asignar
    this.autor = autor.trim();
    this.titulo = tituloNormalizado;
    this.descripcion = descripcionNormalizado;
    this.categoria = categoria;
    this.fechaPublicacion = new Date();
    this.activa = true;
    this.destacado = false;
    this.etiquetas = [];
    this.reportes = [];
    this.estado = "pendiente";
  }

  mostrarResumen() {
    return `${this.titulo} ${this.descripcion} ${this.autor}`;
  }

  estaActiva() {
    return this.activa;
  }

  esDeAutor(nombre) {
    return this.autor === nombre;
  }

  diasPublicada() {
    const ms = new Date() - this.fechaPublicacion;
    return Math.floor(ms / (1000 * 60 * 60 * 24));
  }

  darDeBaja() {
    this.activa = false;
  }

  destacar() {
    this.destacado = !this.destacado;
  }

  get resumen() {
    const estadoTexto = this.activa ? "Activa" : "Inactiva";
    const nombreAutor = this.autor ? this.autor : "Sin autor";
    return `${nombreAutor} — ${this.titulo} (${estadoTexto})`;
  }

  agregarEtiqueta(etiqueta) {
    const normalizada = typeof etiqueta === "string" ? etiqueta.trim() : "";
    if (!normalizada) {
      throw new Error("Etiqueta inválida");
    }
    const yaExiste = this.tieneEtiqueta(normalizada);
    if (!yaExiste) {
      this.etiquetas.push(normalizada);
    }
  }

  tieneEtiqueta(etiqueta) {
    if (typeof etiqueta !== "string") return false;
    const buscada = etiqueta.trim().toLowerCase();
    return this.etiquetas.some((e) => e.toLowerCase() === buscada);
  }

  // Parte 2
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
