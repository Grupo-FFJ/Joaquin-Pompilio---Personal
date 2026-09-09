import express from "express";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/api/publicaciones", (req, res) => {
  // Si en la URL mandan ?error=1, devolvemos error 500
  if (req.query.error === "1") {
    return res.status(500).json({ error: "Error simulado en el servidor" });
  }

  const datos = [
    {
      tipo: "venta",
      titulo: "Libro de Redes",
      descripcion: "Tanenbaum 5ta edición en muy buen estado",
      autor: "Joaquín",
      email: "joaquin@uns.edu.ar",
      precio: 15000,
      activa: true
    },
    {
      tipo: "servicio",
      titulo: "Clases de Algoritmos",
      descripcion: "Apoyo para primer año, estructuras de datos",
      autor: "Martín",
      email: "martin@uns.edu.ar",
      modalidad: "virtual",
      duracion: 60,
      activa: true
    }
  ];

  res.json(datos);
});

app.listen(3000, () => console.log("Servidor disponible en http://localhost:3000"));