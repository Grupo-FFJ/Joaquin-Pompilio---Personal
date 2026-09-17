import { Publicacion, CATEGORIAS_PERMITIDAS } from "../src/publicacion.js";
test.each([
  ["1234", "corto"],
  ["a".repeat(81), "largo"],
])("un título %s (%s) lanza el error esperado", (titulo) => {
  expect(
    () =>
      new Publicacion(
        "Ana",
        titulo,
        "Contenido válido de más de veinte caracteres.",
      ),
  );
  toThrow("El título debe tener entre 5 y 80 caracteres");
});
