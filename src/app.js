require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const connectDB = require("../config/db_mongo");
const sequelize = require("../config/db_pg");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan("dev")); // console.log de las peticiones al servidor para facilitar el desarrollo y debugging
app.use(helmet());  // Securización de cabeceras HTTP
app.use(express.json());

// Rutas
const moviesRoutes = require("./routes/movies.routes");
const favoritesRoutes = require("./routes/favorites.routes"); 

const usersRoutes = require("./routes/usersRoutes")
const routesFilms = require("./routes/filmsRoutes")
app.get("/", (_req, res) => {
  res.json({ message: "funciona" });
});

app.use("/api", moviesRoutes);
app.use("/api", favoritesRoutes); 
app.use('/api', usersRoutes)
app.use("/api/films", routesFilms)

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Seguridad runtime (mínimo)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

// Start server and bbdds
const startServer = async () => {
  try {
    await Promise.all([
      sequelize.authenticate(),
      connectDB()
    ]);

    console.log("Databases connected");

    await sequelize.sync({ force: false });
    console.log("Models synced");

    app.listen(PORT, () => {
      console.log(`API listening at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
};

startServer();