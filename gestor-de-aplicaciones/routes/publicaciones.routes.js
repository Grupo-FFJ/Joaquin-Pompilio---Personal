import { Router } from "express";
import { CATEGORIAS_PERMITIDAS } from "../src/publicacion.js";

export default function crearRouterPublicaciones(repositorio) {
  const router = Router();

  // PASO 5A: devolver repositorio.listar() como JSON
  router.get("/", (req, res) => {
    res.json(repositorio.listar());
  });

  // Ya existe desde la clase 16: devuelve CATEGORIAS_PERMITIDAS
  router.get("/categorias", (req, res) => {
    res.json(CATEGORIAS_PERMITIDAS);
  });

  // PASO 5B: crear con repositorio.agregar(...) y responder 201/400[cite: 3, 5]
  router.post("/", (req, res) => {
    try {
      const { autor, titulo, descripcion, categoria } = req.body;
      const nueva = repositorio.agregar(autor, titulo, descripcion, categoria);
      res.status(201).send(nueva.mostrarResumen());
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  // PUT /publicaciones/:id -> 404 si no existe, 400 si datos inválidos
  router.put("/:id", (req, res) => {
    const publicacionExistente = repositorio.buscarPorId(req.params.id);
    if (!publicacionExistente) {
      return res.status(404).send("Publicación no encontrada");
    }

    try {
      const actualizada = repositorio.actualizar(req.params.id, req.body);
      res.status(200).send(actualizada.mostrarResumen());
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  // DELETE /publicaciones/:id -> 404 si no existe, 204 o 200 al eliminar
  router.delete("/:id", (req, res) => {
    const eliminada = repositorio.eliminar(req.params.id);
    if (!eliminada) {
      return res.status(404).send("Publicación no encontrada");
    }
    res.sendStatus(204);
  });

  return router;
}