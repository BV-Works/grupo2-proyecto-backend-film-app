const normalizeMovie = (movie, source) => { // duplicados eliminados y añadido movieSourceId para funcionalidades de favoritos
  if (!movie) return null;

  if (source === "omdb") {
    return {
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
      id: movie.imdbID,
      movieSource: "omdb",
      movieSourceId: movie.imdbID,
      director: movie.Director,
      genre: movie.Genre,
      runtime: movie.Runtime,
      plot: movie.Plot,
      actors: movie.Actors,
      rating: movie.imdbRating,
      awards: movie.Awards,
      boxOffice: movie.BoxOffice,
      country: movie.Country,
      dvd: movie.DVD,
      language: movie.Language,
      metascore: movie.Metascore,
      production: movie.Production,
      rated: movie.Rated,
      ratings: movie.Ratings,
      released: movie.Released,
      response: movie.Response,
      type: movie.Type,
      website: movie.Website,
      writer: movie.Writer,
      imdbRating: movie.imdbRating,
      imdbVotes: movie.imdbVotes,
    };
  }

  if (source === "mongo") {
    return {
      title: movie.title,
      poster: movie.poster,
      year: movie.year,
      id: movie._id,
      movieSource: "mongo",
      movieSourceId: movie._id,
      director: movie.director,
      genre: movie.genre,
      runtime: movie.runtime,
      plot: movie.plot,
      actors: movie.actors,
      rating: movie.rating,
    };
  }

  return null;
};

module.exports = normalizeMovie;