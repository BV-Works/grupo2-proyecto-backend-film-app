const axios = require("axios"); // simplifica la URL, gestion de params, parsea a JSON, manejo de errores (captura reespuestas uera del rango 200)

const getMovieById = async (imdbID) => {
    try {
        const response = await axios.get("http://www.omdbapi.com/", {
            params: {
              apikey: process.env.OMDB_API_KEY,
              i: imdbID,
              plot: "short", // sinopsis corta para tarjetas de películas
            },
          });
        
          if (response.data.Response === "False") {
            return null;
          }
        
          return response.data;
    } catch (e) {
        console.error("OMDb error:", e.message); 
        return null; 
    }
};

module.exports = {
  getMovieById,
};