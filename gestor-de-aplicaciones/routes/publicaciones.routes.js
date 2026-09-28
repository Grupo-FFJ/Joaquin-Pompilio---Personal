import { Router } from "express";
import { CATEGORIAS_PERMITIDAS } from "../src/publicacion.js";

export default function crearRouterPublicaciones(repositorio) {
  const router = Router();

  // PASO 5A: devolver repositorio.listar() como JSON
  router.get("/", (req, res) => {
    res.json(repositorio.listar());
  });

  // Devuelve CATEGORIAS_PERMITIDAS
  router.get("/categorias", (req, res) => {
    res.json(CATEGORIAS_PERMITIDAS);
  });

  // POST /publicaciones -> AHORA ASYNC + AWAIT
  router.post("/", async (req, res) => {
    try {
      const { autor, titulo, descripcion, categoria } = req.body;
      const nueva = await repositorio.agregar(autor, titulo, descripcion, categoria);
      res.status(201).send(nueva.mostrarResumen());
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  // PUT /publicaciones/:id -> AHORA ASYNC + AWAIT
  router.put("/:id", async (req, res) => {
    const publicacionExistente = repositorio.buscarPorId(req.params.id);
    if (!publicacionExistente) {
      return res.status(404).send("Publicación no encontrada");
    }

    try {
      const actualizada = await repositorio.actualizar(req.params.id, req.body);
      res.status(200).send(actualizada.mostrarResumen());
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  // DELETE /publicaciones/:id -> AHORA ASYNC + AWAIT
  router.delete("/:id", async (req, res) => {
    const eliminada = await repositorio.eliminar(req.params.id);
    if (!eliminada) {
      return res.status(404).send("Publicación no encontrada");
    }
    res.sendStatus(204);
  });

  return router;
}