const fetchMovies = require('../utils/fetch-movies.utils.js');

const getMovies = async (req, res) => {
  try {
    const { t, i, s, page } = req.query;

    let params = {};

    if (i) {
      params.i = i;
    } else if (t) {
      params.t = t;
    } else if (s) {
      params.s = s;
      params.page = page || 1;
    } else {
      return res.status(400).json({
        error: 'Debes proporcionar al menos un parámetro: t, i, o s'
      });
    }

    const movies = await fetchMovies(params);

    if (movies.Response === 'False') {
      return res.status(404).json({ error: movies.Error });
    }

    res.json(movies);

  } catch (error) {
    console.error('Error en OMDB API:', error.message);
    res.status(500).json({ error: 'Error al conectar con OMDB' });
  }
};

const getRandomMovies = async (req, res) => {
  try {
    const keywords = [
      "action",
      "love",
      "war",
      "star",
      "dark",
      "man",
      "night",
      "dead",
      "love",
      "the"
    ];

    const randomKeyword =
      keywords[Math.floor(Math.random() * keywords.length)];

    const page = Math.floor(Math.random() * 5) + 1;

    const movies = await fetchMovies({
      s: randomKeyword,
      page
    });

    if (movies.Response === "False") {
      return res.status(404).json({ error: movies.Error });
    }

    // 🔥 mezclamos y limitamos resultados
    const shuffled = movies.Search.sort(() => 0.5 - Math.random());
    const limited = shuffled.slice(0, 10);

    res.json(limited);
  } catch (error) {
    console.error("Error random movies:", error.message);
    res.status(500).json({ error: "Error obteniendo películas random" });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: 'Debes proporcionar un IMDb ID'
      });
    }

    const params = {
      i: id,
      apikey: API_KEY
    };

    const movie = await fetchMovies(params);

    if (movie.Response === 'False') {
      return res.status(404).json({ error: movie.Error });
    }

    res.json(movie);

  } catch (error) {
    console.error('Error detalle película:', error.message);
    res.status(500).json({ error: 'Error obteniendo detalle de película' });
  }
};


module.exports = { getMovies, getRandomMovies };