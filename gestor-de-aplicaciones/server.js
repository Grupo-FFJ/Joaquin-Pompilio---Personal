import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { RepositorioPublicaciones } from "./src/RepositorioPublicaciones.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// instancia del dominio
const repositorio = new RepositorioPublicaciones();

app.use(express.static(path.join(__dirname, "public")));

app.get("/estado-comunidad", (req, res) => {
  res.send(repositorio.obtenerEstado());
});

app.get("/estado-inactivas", (req, res) => {
  res.send(repositorio.obtenerEstadoInactivas());
});

/*GET identifica el método, /estado-comunidad el camino, y la función el handler. req
representa lo que llegó al servidor; res son las operaciones para construir y enviar la
respuesta. El handler coordina — quien decide el contenido del mensaje es
repositorio.obtenerEstado(). */

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

import { Usuario } from "./src/usuario.js";
import { Publicacion } from "./src/publicacion.js";

const u = new Usuario("Lucas", "lucas@ejemplo.com");
const pub1 = new Publicacion("Perro perdido", "Se busca caniche", u);
const pub2 = new Publicacion("Gato encontrado", "En la plaza", u);
const pub3 = new Publicacion("Bici vieja", "Para reparar", u);

pub3.activa = false; // o pub3.darDeBaja();

repositorio.agregar(pub1);
repositorio.agregar(pub2);
repositorio.agregar(pub3);
