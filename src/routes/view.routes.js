const express = require("express");
const router = express.Router();
const {
  authenticateJWT,
  authorizeAdmin,
} = require("../middlewares/auth.middleware");

// Vista de inicio
router.get('/home', (req, res) => {
  res.render('index', { title: 'Movie App Grupo 2', user: null, page: 'home'});
});

// Login
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login', user: null, page: 'login' });
});

// Signup
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Registro', user: null, page: 'signup' });
});

// Admin - Admin Movies
router.get('/admin-movies', authenticateJWT, (req, res) => {
  res.render('admin-movies', { title: 'Gestion de películas', user: req.user, page: 'admin-movies' });
});

// Admin - usuarios
router.get('/admin-users', authenticateJWT, (req, res) => {
  res.render('admin-users', { title: 'Usuarios', user: req.user, page: 'admin-users' });
});

// Dashboard
router.get('/dashboard', authenticateJWT, (req, res) => {
  console.log(req.user);
  res.render('dashboard', { title: 'Dashboard', user: req.user, page: 'dashboard' });
});


module.exports = router;