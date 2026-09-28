import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { RepositorioPublicaciones } from "./src/RepositorioPublicaciones.js";
import crearRouterPublicaciones from "./routes/publicaciones.routes.js";
import { paraExponer, convertirAXML } from "./src/formatos.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const RUTA_DATOS = path.join(__dirname, "data", "publicaciones.json");
const repositorio = new RepositorioPublicaciones(RUTA_DATOS);
await repositorio.cargar(); // PASO 8D: cargar antes de escuchar solicitudes

// sembrar datos de ejemplo sólo la primera vez
if (repositorio.listar().length === 0) {
  await repositorio.agregar(
    "Lucas",
    "Perro perdido",
    "Se busca caniche blanco con collar rojo por la zona céntrica",
    "aviso"
  );

  await repositorio.agregar(
    "Lucas",
    "Gato encontrado",
    "Gato persa encontrado merodeando cerca de la plaza principal",
    "aviso"
  );

  const pub3 = await repositorio.agregar(
    "Lucas",
    "Bici vieja rodado 26",
    "Bicicleta usada para reparar, necesita cambio de cubiertas",
    "compraventa"
  );

  pub3.activa = false;
  await repositorio.guardar(); 
}

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.get("/datos/publicaciones.json", (req, res) => {
  // PASO 4A: res.json(...) — Express arma el Content-Type application/json solo
  const publicaciones = repositorio.listar(); // o repositorio.publicaciones según tu Repositorio
  res.json(publicaciones.map(paraExponer));
});

app.get("/datos/publicaciones.xml", (req, res) => {
  // PASO 4B: res.type("application/xml").send(...)
  const publicaciones = repositorio.listar(); // o repositorio.publicaciones según tu Repositorio
  res.type("application/xml").send(convertirAXML(publicaciones));
});

// PASO 5C: Montar router de publicaciones
app.use("/publicaciones", crearRouterPublicaciones(repositorio));

// Rutas de estado
app.get("/estado-comunidad", (req, res) => {
  res.send(repositorio.obtenerEstado());
});

app.get("/estado-inactivas", (req, res) => {
  res.send(repositorio.obtenerEstadoInactivas());
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});