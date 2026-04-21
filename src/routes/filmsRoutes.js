const express = require("express");
const router = express.Router();

const { getFilms, getFilmById, createFilm, updateFilm, deleteFilm } = require("../controllers/filmsController");

router.get("/", getFilms);
router.get("/:id", getFilmById);
router.post("/", createFilm)
router.put("/:id", updateFilm)
router.delete("/:id", deleteFilm)

module.exports = router;