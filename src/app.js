require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const connectDB = require("../config/db_mongo");
const sequelize = require("../config/db_pg");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

// Rutas
const moviesRoutes = require("./routes/movies.routes");

app.get("/", (_req, res) => {
  res.json({ message: "funciona" });
});

app.use('/api', moviesRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Start server and bbdds
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected");

    await sequelize.sync(); // solo desarrollo
    console.log("Models synced");

    await connectDB();
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`API listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
};

startServer();