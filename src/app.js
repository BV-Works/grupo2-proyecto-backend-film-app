require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const connectDB = require("../config/db_mongo");
const sequelize = require("../config/db_pg");

const app = express();
const PORT = process.env.PORT || 3000;
const openapiDocument = YAML.load(path.join(process.cwd(), "docs", "openapi.yaml"));

// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
// Middlewares
app.use(morgan("dev")); // console.log de las peticiones al servidor para facilitar el desarrollo y debugging
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],

        // 👇 AQUÍ ESTÁ LA CLAVE
        "img-src": [
          "'self'",
          "data:",       // por si usas base64
          "https:"       // permite imágenes externas
        ],

        // "script-src": ["'self'"],
        // "style-src": ["'self'", "https:", "'unsafe-inline'"], // si usas css externo
      },
    },
  })
); // Securización de cabeceras HTTP y configuracion de csp
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // permitir a express leer formularios html
app.use(cookieParser());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));


// Esto es FUNDAMENTAL porque: EJS genera HTML pero el navegador necesita:CSS y js e imagenes
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
const authRoutes = require("./routes/auth.routes");
const favoritesRoutes = require("./routes/favorites.routes");
const usersRoutes = require("./routes/users.routes");
const filmsRoutes = require("./routes/films.routes");
const viewRoutes = require("./routes/view.routes");

app.get("/", (_req, res) => {
  res.json({ message: "funciona" });
});

app.use("/api", authRoutes);
app.use("/api", favoritesRoutes);
app.use("/api", usersRoutes);
app.use("/api", filmsRoutes);
app.use("/", viewRoutes);

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
    await Promise.all([sequelize.authenticate(), connectDB()]);

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
