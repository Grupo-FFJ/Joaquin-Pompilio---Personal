import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { RepositorioPublicaciones } from "./src/RepositorioPublicaciones.js";
import crearRouterPublicaciones from "./routes/publicaciones.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Instancia del repositorio
const repositorio = new RepositorioPublicaciones();

// Datos iniciales de prueba (pasando los datos crudos al repositorio)
repositorio.agregar(
  "Lucas",
  "Perro perdido",
  "Se busca caniche blanco con collar rojo por la zona céntrica",
  "aviso"
);

repositorio.agregar(
  "Lucas",
  "Gato encontrado",
  "Gato persa encontrado merodeando cerca de la plaza principal",
  "aviso"
);

const pub3 = repositorio.agregar(
  "Lucas",
  "Bici vieja rodado 26",
  "Bicicleta usada para reparar, necesita cambio de cubiertas",
  "compraventa"
);

pub3.activa = false;

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

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