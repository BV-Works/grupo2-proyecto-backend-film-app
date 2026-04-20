const Films = require("../models/Films");

// GET
// http://localhost:3000/api/movies
const getFilms = async (req, res) => {
  try {
    const films = await Films.find();

    if (films.length === 0) {
      return res.status(200).json({
        message: "No hay peliculas creadas por administrador",
      });
    }

    return res.status(200).json(films);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// GET
// http://localhost:3000/api/movies/(id)
const getFilmById = async (req, res) => {
  const id = req.params.id;
  try {
    const film = await Films.findById(id);

    if (!film) {
      return res.status(404).json({
        message: "La película que buscas no existe",
      });
    }

    return res.status(200).json(film);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// POST
// http://localhost:3000/api/movies/
const createFilm = async (req, res) => {
  try {
    const {
      title,
      poster,
      year,
      director,
      genre,
      runtime,
      plot,
      actors,
      rating,
    } = req.body;

    const film = await Films.create({
      title,
      poster,
      year,
      director,
      genre,
      runtime,
      plot,
      actors,
      rating: Array.isArray(rating) ? rating : [], // Si rating es un array lo usa, si no crea array vacío
    });

    return res.status(201).json({
      message: `Pelicula creada: ${film.title}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// PUT
// http://localhost:3000/api/movies/(id)
const updateFilm = async (req, res) => {
  const id = req.params.id;
  try {
    const allowedFields = [
      "title",
      "poster",
      "year",
      "director",
      "genre",
      "runtime",
      "plot",
      "actors",
      "rating",
    ];

    // Filtra solo campos aceptados por el Schema
    const updateData = {};
    for (const key of Object.keys(req.body)) {
      // Object.keys() se queda solo con los campos pasados por el body
      if (allowedFields.includes(key)) {
        updateData[key] = req.body[key]; // { updateData[title]: req.body[Matrix]} -> { title: Matrix }
      }
    }

    const film = await Films.findByIdAndUpdate(id, updateData, {
      new: true, // Devuelve la película ya actualizada
      runValidators: true, // Activa las validaciones del Schema
    });

    if (!film) {
      return res.status(404).json({ message: "La película no existe" });
    }

    return res.status(200).json({
      message: `Pelicula editada: ${id}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// DELETE
// http://localhost:3000/api/movies/(id)
const deleteFilm = async (req, res) => {
  const id = req.params.id;
  try {
    const film = await Films.findByIdAndDelete(id);

    if (!film) {
      return res.status(404).json({
        message: "La película no existe",
      });
    }

    return res.status(200).json({
      message: `Película eliminada: ${id}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = {
  getFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm
};
