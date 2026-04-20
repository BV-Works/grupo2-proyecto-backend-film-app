const express = require('express');
const moviesController = require("../controllers/movies.controller");
const router = express.Router();

router.get('/movies', moviesController.getMovies); // buscador
router.get('/movies/random', moviesController.getRandomMovies); // rellena unas cuantas películas random para la home
router.get('/movies/:id', moviesController.getMovieById); // detalle de película por IMDb ID

module.exports = router;
