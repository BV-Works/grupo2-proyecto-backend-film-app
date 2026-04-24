const normalizeMovie = (movie, source) => {
    if (!movie) return null;
  
    if (source === "omdb") {
      return {
        title: movie.Title,
        poster: movie.Poster,
        year: movie.Year,
        director: movie.Director,
        genre: movie.Genre,
        runtime: movie.Runtime,
        plot: movie.Plot,
        actors: movie.Actors,
        rating: movie.imdbRating,
      };
    }
  
    if (source === "mongo") {
      return {
        title: movie.title,
        poster: movie.poster,
        year: movie.year,
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