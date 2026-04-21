const express = require("express"); 

const favoritesController = require("../controllers/favorites.controller"); 
const router = express.Router(); 

// ROUTES::
router.get("/favorites", favoritesController.getFavorites); 
router.post("/favorites", favoritesController.addFavorite); 
router.delete("/favorites/:id", favoritesController.deleteFavorite); 

module.exports = router; 