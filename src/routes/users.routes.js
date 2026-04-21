const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");
const {
  authenticateJWT,
  authorizeAdmin,
} = require("../middlewares/auth.middleware");

router.get("/users", authenticateJWT, authorizeAdmin, getAllUsers); // todos los usuarios (Solo el admin)
router.get("/user/:id", authenticateJWT, authorizeAdmin, getUser); // perfil de un usuario
router.put("/user/:id", authenticateJWT, authorizeAdmin, updateUser); // editar usuario
router.delete("/user/:id", authenticateJWT, authorizeAdmin, deleteUser); // borrar usuario (Solo el admin)

module.exports = router;
