const express = require("express"); 

const favoritesController = require("../controllers/favorites.controller");
const { authenticateJWT } = require("../middlewares/auth.middleware");

const router = express.Router(); 

// ROUTES::
router.get("/favorites", authenticateJWT , favoritesController.getFavorites); 
router.post("/favorites", authenticateJWT, favoritesController.addFavorite); 
router.delete("/favorites/:id", authenticateJWT, favoritesController.deleteFavorite); 

module.exports = router; 