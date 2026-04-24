const axios = require("axios");

const getMovieById = async (imdbID) => {
    try {
        const response = await axios.get("http://www.omdbapi.com/", {
            params: {
              apikey: process.env.OMDB_API_KEY,
              i: imdbID,
              plot: "short",
            },
          });
        
          if (response.data.Response === "False") {
            return null;
          }
        
          return response.data;

    } catch (e) {
        console.error("OMDb error:", error.message); 
        return null; 
    }
  
};

module.exports = {
  getMovieById,
};