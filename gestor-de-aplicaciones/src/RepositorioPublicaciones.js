import { Usuario } from "./usuario.js";
import { Publicacion } from "./publicacion.js";
import { PublicacionVenta } from "./publicacionVenta.js";
import { PublicacionServicio } from "./publicacionServicio.js";

export class RepositorioPublicaciones {
  constructor() {
    this.publicaciones = []; // Unificado en this.publicaciones
    this.proximoId = 1;
  }

  agregar(autor, titulo, descripcion, categoria) {
    // PASO 2A: construir la Publicacion con this.proximoId y avanzar el contador
    const publicacion = new Publicacion(autor, titulo, descripcion, categoria);
    publicacion.id = this.proximoId;
    this.proximoId++;

    this.publicaciones.push(publicacion);
    return publicacion;
  }

  listar() {
    // PASO 2B: devolver una copia superficial
    return [...this.publicaciones];
  }

  buscarPorId(id) {
    // PASO 2C: usar Number(id) para IDs que llegan como string
    const idNumerico = Number(id);
    return this.publicaciones.find((pub) => pub.id === idNumerico);
  }

  actualizar(id, cambios) {
    const anterior = this.buscarPorId(id);
    if (!anterior) throw new Error("Publicación inexistente");

    // Constructor respeta: (autor, titulo, descripcion, categoria)
    const actualizada = new Publicacion(
      cambios.autor ?? anterior.autor,
      cambios.titulo ?? anterior.titulo,
      cambios.descripcion ?? anterior.descripcion,
      cambios.categoria ?? anterior.categoria
    );

    // PASO 3: Conservamos el id y el estado previo
    actualizada.id = anterior.id;
    actualizada.activa = anterior.activa;
    actualizada.destacado = anterior.destacado;
    actualizada.fechaPublicacion = anterior.fechaPublicacion;
    actualizada.etiquetas = [...anterior.etiquetas];
    actualizada.reportes = [...anterior.reportes];
    actualizada.estado = anterior.estado;

    const indice = this.publicaciones.indexOf(anterior);
    this.publicaciones[indice] = actualizada;
    return actualizada;
  }

  eliminar(id) {
    const publicacion = this.buscarPorId(id);
    if (!publicacion) return false;
    this.publicaciones.splice(this.publicaciones.indexOf(publicacion), 1);
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