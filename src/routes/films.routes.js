const express = require("express");
const router = express.Router();

const { getMovies, getRandomMoviesHome, getFilmsAdmin, getFilmById, createFilm, updateFilm, deleteFilm } = require("../controllers/films.controller");
const { authenticateJWT, authorizeAdmin } = require("../middlewares/auth.middleware");

// GENERAL/OMBD
router.get('/films', authenticateJWT, getMovies); // buscador
router.get('/films/random', getRandomMoviesHome); // rellena unas cuantas películas random para la home
// MONGO (solo admin)
router.get("/films/admin", authenticateJWT, authorizeAdmin, getFilmsAdmin); // listado peliculas admin
router.get("/films/admin/:id", authenticateJWT, authorizeAdmin, getFilmById); // pelicula por id en mongo 
router.post("/films", authenticateJWT, authorizeAdmin, createFilm); // crear pelicula en mongo 
router.put("/films/:id", authenticateJWT, authorizeAdmin, updateFilm); // modificar pelicula en mongo 
router.delete("/films/:id", authenticateJWT, authorizeAdmin, deleteFilm) // borrar pelicula en mongo

module.exports = router;