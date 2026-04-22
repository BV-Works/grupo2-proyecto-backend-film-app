const express = require("express");
const router = express.Router();
const {
  authenticateJWT,
  authorizeAdmin,
} = require("../middlewares/auth.middleware");

// Vista de inicio
router.get('/home', (req, res) => {
  res.render('index', { title: 'Movie App Grupo 2' });
});




module.exports = router;