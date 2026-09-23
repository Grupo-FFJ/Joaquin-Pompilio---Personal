import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { RepositorioPublicaciones } from "./src/RepositorioPublicaciones.js";
import { Usuario } from "./src/usuario.js";
import { Publicacion } from "./src/publicacion.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Instancia del repositorio
const repositorio = new RepositorioPublicaciones();

// Datos iniciales de prueba (respetando autor, título >= 5 y descripción >= 20 caracteres)
const pub1 = new Publicacion(
  "Lucas",
  "Perro perdido",
  "Se busca caniche blanco con collar rojo por la zona céntrica",
  "aviso"
);

const pub2 = new Publicacion(
  "Lucas",
  "Gato encontrado",
  "Gato persa encontrado merodeando cerca de la plaza principal",
  "aviso"
);

const pub3 = new Publicacion(
  "Lucas",
  "Bici vieja rodado 26",
  "Bicicleta usada para reparar, necesita cambio de cubiertas",
  "compraventa"
);

pub3.activa = false;

repositorio.agregar(pub1);
repositorio.agregar(pub2);
repositorio.agregar(pub3);

// Middlewares - EJERCICIO !& - Parte 3
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Rutas
app.get("/estado-comunidad", (req, res) => {
  res.send(repositorio.obtenerEstado());
});

app.get("/estado-inactivas", (req, res) => {
  res.send(repositorio.obtenerEstadoInactivas());
});

app.post("/publicaciones", (req, res) => {
  try {
    const publicacion = new Publicacion(
      req.body.autor,
      req.body.titulo,
      req.body.descripcion,
      req.body.categoria
    );
    repositorio.agregar(publicacion);
    res.status(201).send(publicacion.mostrarResumen());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});