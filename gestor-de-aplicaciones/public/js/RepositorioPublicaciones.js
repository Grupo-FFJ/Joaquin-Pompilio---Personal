import { Usuario } from "./usuario.js";
import { Publicacion } from "./publicacion.js";
import { PublicacionVenta } from "./publicacionVenta.js";
import { PublicacionServicio } from "./publicacionServicio.js";

export class RepositorioPublicaciones {
  constructor() {
    this.arreglo = [];
  }

  agregar(publicacion) {
    this.arreglo.push(publicacion);
  }

  todas() {
    return this.arreglo;
  }

  cargarDesde(datos) {
    this.arreglo = datos.map((item) => {
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
        instancia = new Publicacion(item.titulo, item.descripcion, usuario);
      }

      if (item.activa === false) {
        instancia.darDeBaja();
      }

      return instancia;
    });
  }

  buscarPorUsuario(nombre) {
    return this.arreglo.filter(
      (publicacion) => publicacion.usuario && publicacion.usuario.nombre === nombre
    );
  }

  filtrarActivas() {
    return this.arreglo.filter((publicacion) => publicacion.activa === true);
  }

  cantidadTotal() {
    return this.arreglo.length;
  }

  listaResumenes() {
    return this.arreglo.map((publicacion) => publicacion.resumen);
  }

  filtrarPorTipo(claseConstructor) {
    return this.arreglo.filter((p) => p instanceof claseConstructor);
  }
}