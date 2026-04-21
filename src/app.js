const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("../config/db_mongo");
const sequelize = require("../config/db_pg"); // Credenciales de conexión a la base de datos
const usersRoutes = require("./routes/usersRoutes")

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan("dev")); // console.log de las peticiones al servidor para facilitar el desarrollo y debugging
app.use(helmet()); // Securización de cabeceras HTTP
app.use(express.json());

//Rutas
app.use('/api', usersRoutes)

app.get("/", (_req, res) => {
  res.json({ message: "funciona" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

connectDB();

// Test DB
const startDB = async () => {
  try{
    await sequelize.authenticate(); 
    console.log("DB connected"); 
    await sequelize.sync({ force: false }); 
    console.log("Sync'd models"); 

    app.listen(PORT, () => {
      console.log(`API listening at Port: ${PORT}`);
    });
  } catch (error) {
    console.log("DB error:", error); 
  }
}

startDB(); 


