const express = require('express');
const moviesController = require("../controllers/movies.controller");
const router = express.Router();

router
  .route('/movies')
  .get(moviesController.getMoviesByName)
  .get(moviesController.getMoviesByImdbID)
  .get(moviesController.getSomeMovies);

module.exports = router;
