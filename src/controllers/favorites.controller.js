const { Favorite } = require("../models");   // changed requirements to delete User (not used)
const Movie = require("../models/Films");

const getOmdbMovieById = require("../utils/omdb.helper"); 
const normalizeMovie = require("../utils/movie-normalizer"); 

const getFavorites = async (req, res) => {
    try {
        const userId = req.user.id;                         // changed hardcode id FROM req.body --> req.user (JWT cookies)

        const favorites = await Favorite.findAll({ 
            where: { userId },
            order: [["createdAt", "DESC"]],             // order from newest to old
        }); 

        const detailedFavorites = await Promise.all(
            favorites.map(async (favorite) => {
                let movie = null; 

                if (favorite.movieSource === "omdb") {
                    movie = await getOmdbMovieById(favorite.movieSourceId);  
                }
                if (favorite.movieSource === "mongo") {
                    movie = await Movie.findById(favorite.movieSourceId).lean();  //lean returns objects instead of mongoose docs
                    }
            
                    if (!movie) {
                    return {
                        favoriteId: favorite.id,
                        movieSource: favorite.movieSource,
                        movieSourceId: favorite.movieSourceId,
                        unavailable: true,
                    };
                    }
                    return {
                    favoriteId: favorite.id,
                    movieSource: favorite.movieSource,
                    movieSourceId: favorite.movieSourceId,
                    unavailable: false,
                    ...normalizeMovie(movie, favorite.movieSource),
                    }
            })
        ); 

        return res.status(200).json(detailedFavorites);

    } catch (e) {
        return res.status(500).send(`Internal server error: ${e.message}`); 
    }
}
const addFavorite = async (req, res) => {
    try {
        const userId =  req.user.id;                        // changed hardcode id FROM req.body --> req.user (JWT cookies)
        const { movieSource, movieSourceId } = req.body; 

        if (!movieSource || !movieSourceId) return res.status(400).send("Bad request: mandatory movieSource and movieSourceId"); 

        const validSources = ["omdb", "mongo"];            // ensure only valid sources are used  --already handled by model doubleCheck
        if (!validSources.includes(movieSource)) {
            return res.status(400).json({ message: "movieSource must be omdb or mongo" }) // let user know of constraints
        }

        const [favorite, created] = await Favorite.findOrCreate({   // favorite = movie object  created = boolean
            where: {
                userId: userId, 
                movieSource: movieSource,
                movieSourceId: movieSourceId
            }
        }); 

        return res.status(created ? 201 : 200).json({ favorite, created });  // if created = true return status 201, else 200 (found)
    } catch (e) {
        console.error(e); 
        return res.status(500).send(`Error saving favorite: ${e.message}`); 
    }
}

const deleteFavorite = async (req, res) => {
    try {
        const userId = req.user.id; // --> get user from JWT cookies
        const { id } = req.params; 

        const deleted = await Favorite.destroy({
            where: { id, userId }                   // ensure deleiton of OWN favorites
        }); 

        if (deleted === 0) return res.status(404).send("Favorite not found");
        
        return res.status(200).send(`Favorite with ID ${id} deleted`); 
    } catch (e) {
        console.error(e); 
        return res.status(500).send(`Error deleting favorite: ${e.message}`); 
    }
}; 

module.exports = {
    getFavorites, 
    addFavorite, 
    deleteFavorite
}

// SERVICES to handle functions 
