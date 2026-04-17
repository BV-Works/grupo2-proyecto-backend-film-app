const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/db_mongo");
const pool = require("./config/db_pg"); // Credenciales de conexión a la base de datos

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan("dev")); // console.log de las peticiones al servidor para facilitar el desarrollo y debugging
app.use(helmet()); // Securización de cabeceras HTTP
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "funciona" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

connectDB();

// Test DB
pool
  .connect()
  .then(() => console.log("Postgre conectada"))
  .catch((err) => console.error("Error DB:", err));

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
