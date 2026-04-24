const express = require("express"); 

const favoritesController = require("../controllers/favorites.controller");
const { authenticateJWT } = require("../middlewares/auth.middleware");

const router = express.Router(); 

router.get("/favorites", authenticateJWT , favoritesController.getFavorites); // get all favorites de un usuario
router.post("/favorites", authenticateJWT, favoritesController.addFavorite);  // añadir un fav a un usuario
router.delete("/favorites/:id", authenticateJWT, favoritesController.deleteFavorite); // borrar un fav a un usuario

module.exports = router; 