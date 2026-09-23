import { RepositorioPublicaciones } from "../src/RepositorioPublicaciones.js";

describe("RepositorioPublicaciones · CRUD", () => {
  let repositorio;

  beforeEach(() => {
    repositorio = new RepositorioPublicaciones();
  });

  test("agregar asigna ids crecientes a partir de 1", () => {
    // PASO 6A
    const pub1 = repositorio.agregar(
      "Lucas",
      "Primer título válido",
      "Descripción con más de veinte caracteres requeridos",
      "general"
    );
    const pub2 = repositorio.agregar(
      "Martín",
      "Segundo título válido",
      "Otra descripción con más de veinte caracteres requeridos",
      "aviso"
    );

    expect(pub1.id).toBe(1);
    expect(pub2.id).toBe(2);
  });

  test("listar devuelve una copia: modificarla no afecta al repositorio", () => {
    // PASO 6B
    repositorio.agregar(
      "Lucas",
      "Título de prueba",
      "Descripción con más de veinte caracteres requeridos",
      "general"
    );

    const lista = repositorio.listar();
    lista.pop(); // Modificamos la lista externa devuelta

    // El repositorio interno debe conservar su elemento
    expect(repositorio.listar().length).toBe(1);
  });

  test("actualizar con datos inválidos no modifica la colección", () => {
    // PASO 6C
    const pub = repositorio.agregar(
      "Lucas",
      "Título original",
      "Descripción original con más de veinte caracteres",
      "general"
    );

    // Intentamos actualizar con un título inválido (menos de 5 caracteres)
    expect(() => {
      repositorio.actualizar(pub.id, { titulo: "abc" });
    }).toThrow();

    // Verificamos que los datos previos permanezcan intactos
    const guardada = repositorio.buscarPorId(pub.id);
    expect(guardada.titulo).toBe("Título original");
  });

  test("eliminar una publicación inexistente devuelve false", () => {
    // PASO 6D
    const resultado = repositorio.eliminar(999);
    expect(resultado).toBe(false);
  });
});