const Favorite = require("../models/favorites.models"); 

const getFavorites = async (req, res) => {
    try {
        const userId = req.query.userId || 1; 

        if (userId) {
            const favorites = await Favorite.findAll({ 
                where: { userId: userId } 
            }); 

            if (favorites.length === 0) return res.status(404).send("No favorites yet"); 

            return res.status(200).json(favorites); 

        } else return res.status(400).send("Please provide ID"); 

    } catch (e) {
        res.status(500).send(`Internal server error: ${e.message}`); 
    }
}
const addFavorite = async (req, res) => {
    try {
        const { userId, movieSource, movieSourceId } = req.body; 

        if (!userId || !movieSource || !movieSourceId) return res.status(400).send("Bad request: mandatory userId, movieSource and movieSourceId"); 

        const newFavorite = await Favorite.findOrCreate({
            where: {
                userId: userId, 
                movieSourceId: movieSourceId
            },
            defaults: {
                movieSource: movieSource
            }
            
        }); 

        res.status(201).json(newFavorite); 
    } catch (e) {
        console.error(e); 
        res.status(500).send(`Error saving favorite: ${e.message}`); 
    }
}

const deleteFavorite = async (req, res) => {
    try {
        const { id } = req.params; 

        const deleted = await Favorite.destroy({
            where: { id: id }
        }); 

        if (deleted === 0) return res.status(404).send("Favorite not found");
        
        res.status(200).send(`Favorite with ID ${id} deleted`); 
    } catch (e) {
        console.log(e); 
        res.status(500).send(`Error deleting favorite: ${e.message}`); 
    }
}; 

module.exports = {
    getFavorites, 
    addFavorite, 
    deleteFavorite
}


// necesitamos contrastar el userId con users en BBDD
// si está continue. de lo contrario "id desconocido"

// SERVICES to handle functions || MODELS to handle functions ?? 
