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
}
