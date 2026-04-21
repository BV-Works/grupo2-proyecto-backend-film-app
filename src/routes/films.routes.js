const express = require("express");
const router = express.Router();

const { getMovies, getRandomMoviesHome, getFilmsAdmin, getFilmById, createFilm, updateFilm, deleteFilm } = require("../controllers/films.controller");

// GENERAL/OMBD
router.get('/films', getMovies); // buscador
router.get('/films/random', getRandomMoviesHome); // rellena unas cuantas películas random para la home
// MONGO
router.get("/films/admin", getFilmsAdmin); // listado peliculas admin
router.get("/films/admin/:id", getFilmById); // pelicula por id en mongo 
router.post("/films", createFilm); // crear pelicula en mongo (solo admin)
router.put("/films/:id", updateFilm); // modificar pelicula en mongo (solo admin)
router.delete("/films/:id", deleteFilm) // borrar pelicula en mongo (solo admin)

module.exports = router;