import { RepositorioPublicaciones } from "../src/RepositorioPublicaciones.js";

test("actualizar() conserva los reportes acumulados antes de la modificación", () => {
  const repositorio = new RepositorioPublicaciones();

  // 1. Crear publicación original
  const pub = repositorio.agregar(
    "Lucas",
    "Bicicleta de montaña",
    "Bicicleta usada en excelentes condiciones generales",
    "compraventa"
  );

  // 2. Acumular reportes simulando la interacción
  pub.reportar("usuario1", "Spam");
  pub.reportar("usuario2", "Contenido ofensivo");

  expect(pub.reportes.length).toBe(2);

  // 3. Aplicar actualización de datos crudos
  const actualizada = repositorio.actualizar(pub.id, {
    titulo: "Bicicleta rodado 29 impecable",
    descripcion: "Descripción actualizada con más de veinte caracteres válidos",
  });

  // 4. Verificar que se conserven los reportes tras la actualización
  expect(actualizada.reportes.length).toBe(2);
  expect(actualizada.reportes[0].motivo).toBe("Spam");
  expect(actualizada.reportes[1].motivo).toBe("Contenido ofensivo");
});