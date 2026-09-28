import { readFile, writeFile } from "node:fs/promises";
import { Usuario } from "./usuario.js";
import { Publicacion } from "./publicacion.js";
import { PublicacionVenta } from "./publicacionVenta.js";
import { PublicacionServicio } from "./publicacionServicio.js";

export class RepositorioPublicaciones {
  constructor(ruta) {
    this.ruta = ruta;
    this.publicaciones = [];
    this.proximoId = 1;
  }

  async cargar() {
    try {
      // PASO 7A: leer con readFile(this.ruta, "utf8"), JSON.parse,
      // reconstruir cada Publicacion y recalcular this.proximoId
      const contenido = await readFile(this.ruta, "utf8");
      const datosCrudos = JSON.parse(contenido);

      this.publicaciones = datosCrudos.map((d) => {
        const pub = new Publicacion(d.autor, d.titulo, d.descripcion, d.categoria);
        pub.id = d.id;
        if (d.activa !== undefined) pub.activa = d.activa;
        return pub;
      });

      // Recalculo proximoId tomando el id mas alto existente + 1
      if (this.publicaciones.length > 0) {
        const maxId = Math.max(...this.publicaciones.map((p) => p.id));
        this.proximoId = maxId + 1;
      } else {
        this.proximoId = 1;
      }
    } catch (error) {
      // PASO 7B: si error.code === "ENOENT" el archivo no existe todavía:
      if (error.code === "ENOENT") {
        this.publicaciones = [];
        this.proximoId = 1;
        await this.guardar();
      } else {
        throw error;
      }
    }
  }

  // PASO 8A: writeFile con formato legible (indentado a 2 espacios)
  async guardar() {
    await writeFile(this.ruta, JSON.stringify(this.publicaciones, null, 2), "utf8");
  }

  // PASO 8B: async + await this.guardar()
  async agregar(autor, titulo, descripcion, categoria) {
    const publicacion = new Publicacion(autor, titulo, descripcion, categoria);
    publicacion.id = this.proximoId;
    this.proximoId++;

    this.publicaciones.push(publicacion);
    await this.guardar();
    return publicacion;
  }

  listar() {
    return [...this.publicaciones];
  }

  buscarPorId(id) {
    const idNumerico = Number(id);
    return this.publicaciones.find((pub) => pub.id === idNumerico);
  }

  // PASO 8C: actualizar y eliminar también persisten en disco
  async actualizar(id, cambios) {
    const anterior = this.buscarPorId(id);
    if (!anterior) throw new Error("Publicación inexistente");

    const actualizada = new Publicacion(
      cambios.autor ?? anterior.autor,
      cambios.titulo ?? anterior.titulo,
      cambios.descripcion ?? anterior.descripcion,
      cambios.categoria ?? anterior.categoria
    );

    actualizada.id = anterior.id;
    actualizada.activa = anterior.activa;
    actualizada.destacado = anterior.destacado;
    actualizada.fechaPublicacion = anterior.fechaPublicacion;
    actualizada.etiquetas = [...anterior.etiquetas];
    actualizada.reportes = [...anterior.reportes];
    actualizada.estado = anterior.estado;

    const indice = this.publicaciones.indexOf(anterior);
    this.publicaciones[indice] = actualizada;

    await this.guardar();
    return actualizada;
  }

  async eliminar(id) {
    const publicacion = this.buscarPorId(id);
    if (!publicacion) return false;

    this.publicaciones.splice(this.publicaciones.indexOf(publicacion), 1);
    await this.guardar();
    return true;
  }

  todas() {
    return [...this.publicaciones];
  }

  cargarDesde(datos) {
    this.publicaciones = datos.map((item) => {
      const usuario = new Usuario(
        item.autor || item.usuario?.nombre || "Autor",
        item.email || item.usuario?.email || "email@ejemplo.com"
      );

      let instancia;
      if (item.tipo === "venta") {
        instancia = new PublicacionVenta(
          item.titulo,
          item.descripcion,
          usuario,
          Number(item.precio)
        );
      } else if (item.tipo === "servicio") {
        instancia = new PublicacionServicio(
          item.titulo,
          item.descripcion,
          usuario,
          item.modalidad,
          Number(item.duracion)
        );
      } else {
        instancia = new Publicacion(
          usuario.nombre,
          item.titulo,
          item.descripcion,
          item.categoria || "general"
        );
      }

      instancia.id = this.proximoId++;

      if (item.activa === false) {
        instancia.darDeBaja();
      }

      return instancia;
    });
  }

  buscarPorUsuario(nombre) {
    return this.publicaciones.filter(
      (publicacion) =>
        publicacion.autor === nombre ||
        (publicacion.usuario && publicacion.usuario.nombre === nombre)
    );
  }

  filtrarActivas() {
    return this.publicaciones.filter((publicacion) => publicacion.activa === true);
  }

  cantidadTotal() {
    return this.publicaciones.length;
  }

  listaResumenes() {
    return this.publicaciones.map((publicacion) => publicacion.resumen);
  }

  filtrarPorTipo(claseConstructor) {
    return this.publicaciones.filter((p) => p instanceof claseConstructor);
  }

  buscarPorEtiqueta(etiqueta) {
    return this.publicaciones.filter(
      (publicacion) =>
        publicacion.activa && publicacion.tieneEtiqueta(etiqueta)
    );
  }

  pendientesDeRevision() {
    return this.publicaciones.filter(
      (publicacion) => publicacion.activa && publicacion.requiereRevision()
    );
  }

  obtenerEstado() {
    const activas = this.publicaciones.filter((p) => p.activa).length;
    return `Publicaciones activas: ${activas}`;
  }

  obtenerEstadoInactivas() {
    const inactivas = this.publicaciones.filter((p) => !p.activa).length;
    return `Publicaciones inactivas: ${inactivas}`;
  }
}