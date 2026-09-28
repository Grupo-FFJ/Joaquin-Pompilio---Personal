import {
  convertirAJSON,
  convertirDesdeJSON,
  convertirAXML,
  paraExponer,
} from "../src/formatos.js";

describe("Parte 6 - Testing adicional de formatos", () => {
  const publicacionEjemplo = {
    id: 1,
    autor: "Carlos",
    titulo: "Vendo teclado mecánico",
    descripcion: "En excelente estado, switches blue",
    categoria: "compraventa",
    mostrarResumen() {
      return `${this.titulo} por ${this.autor}`;
    },
  };

  test("Ida y vuelta de JSON: convertirDesdeJSON(convertirAJSON(x)) debe ser igual a x (después de paraExponer)", () => {
    const publicaciones = [publicacionEjemplo];

    const jsonString = convertirAJSON(publicaciones);
    const resultado = convertirDesdeJSON(jsonString);
    const esperado = publicaciones.map(paraExponer);

    expect(resultado).toEqual(esperado);
    expect(resultado[0].mostrarResumen).toBeUndefined();
  });

  test("Colección vacía: convertirAJSON([]) da '[]' y convertirAXML([]) da '<publicaciones></publicaciones>' sin hijos", () => {
    expect(convertirAJSON([])).toBe("[]");

    const xmlEsperado = '<?xml version="1.0" encoding="UTF-8"?><publicaciones></publicaciones>';
    expect(convertirAXML([])).toBe(xmlEsperado);
  });

  test("Caracteres reservados en XML: un autor con &, <, > o comillas no debe romper la estructura", () => {
    const publicacionConCaracteresEspeciales = {
      id: 2,
      autor: 'Ana & Cía "La Mejor" <test>\'',
      titulo: "Apuntes <avanzados> & notas",
      descripcion: "Texto con comillas 'simples' y \"dobles\"",
      categoria: "aviso",
    };

    const xml = convertirAXML([publicacionConCaracteresEspeciales]);

    expect(xml).toContain("&amp;");
    expect(xml).toContain("&lt;");
    expect(xml).toContain("&gt;");
    expect(xml).toContain("&quot;");
    expect(xml).toContain("&apos;");

    expect(xml).not.toContain("<autor>Ana & Cía");
    expect(xml).not.toContain("<test>");
  });
});