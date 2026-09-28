import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { RepositorioPublicaciones } from "../src/RepositorioPublicaciones.js";

// Contenido que cumpla con la longitud mínima requerida por las validaciones (mínimo 20 caracteres)
const CONTENIDO_VALIDO = "Contenido de prueba con más de veinte caracteres requeridos";

test("una segunda instancia con la misma ruta recupera lo que la primera guardó", async () => {
  const carpeta = await mkdtemp(join(tmpdir(), "publicaciones-"));
  const ruta = join(carpeta, "datos.json");

  const a = new RepositorioPublicaciones(ruta);
  await a.cargar();
  const creada = await a.agregar("Ana", "Apuntes de Redes", CONTENIDO_VALIDO, "aviso");

  // PASO 9: crear una SEGUNDA instancia con la misma ruta, cargar(),
  // y verificar que b.listar() ya tiene la publicación que agregó `a`
  const b = new RepositorioPublicaciones(ruta);
  await b.cargar();

  const publicacionesB = b.listar();
  expect(publicacionesB).toHaveLength(1);
  expect(publicacionesB[0].id).toBe(creada.id);
  expect(publicacionesB[0].autor).toBe("Ana");
  expect(publicacionesB[0].titulo).toBe("Apuntes de Redes");
  expect(publicacionesB[0].descripcion).toBe(CONTENIDO_VALIDO);
});