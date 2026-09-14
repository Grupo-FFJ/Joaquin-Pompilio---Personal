//parte 7
import { PublicacionVenta } from "../public/js/publicacionVenta.js";
import { PublicacionServicio } from "../public/js/publicacionServicio.js";
//parte 4
import { Publicacion } from "../public/js/publicacion.js";
describe("Publicacion", () => {
  test("una publicación nueva comienza activa y sin etiquetas", () => {
    const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
    expect(publicacion.activa).toBe(true);
    expect(publicacion.etiquetas).toEqual([]);
  });
  test("agregarEtiqueta incorpora una etiqueta normalizada", () => {
    const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
    publicacion.agregarEtiqueta(" redes ");
    expect(publicacion.etiquetas).toEqual(["redes"]);
  });
  test("darDeBaja cambia activa a false", () => {
    const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
    publicacion.darDeBaja();
    expect(publicacion.activa).toBe(false);
  });
  //parte 5
  test("una etiqueta repetida no se agrega dos veces", () => {
    const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
    publicacion.agregarEtiqueta("redes");
    publicacion.agregarEtiqueta("redes");
    expect(publicacion.etiquetas).toEqual(["redes"]);
  });
  test("una etiqueta vacía lanza el error esperado", () => {
    const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
    expect(() => publicacion.agregarEtiqueta(" ")).toThrow("Etiqueta inválida");
  });
  test("tieneEtiqueta ignora mayúsculas y minúsculas", () => {
    const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
    publicacion.agregarEtiqueta("Redes");
    expect(publicacion.tieneEtiqueta("redes")).toBe(true);
  });
  //toThrow es el matcher adecuado porque el método agregarEtiqueta() interrumpe el flujo arrojando una excepción (throw new Error("Etiqueta inválida")), en lugar de devolver un valor (return).

  //parte 7
  test("cada subclase arma su propio resumen", () => {
    const venta = new PublicacionVenta("Ana", "Calculadora", "...", 5000);
    const servicio = new PublicacionServicio(
      "Luis",
      "Clases de Álgebra",
      "...",
    );
    expect(venta.mostrarResumen()).toContain("$5000");
    expect(servicio.mostrarResumen()).toContain("Clases de Álgebra");
  });
});

