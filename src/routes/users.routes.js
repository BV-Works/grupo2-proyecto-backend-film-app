const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/users.controller');

router.get('/users', getAllUsers); // todos los usuarios (Solo el admin)
router.get('/user/:id', getUser);  // perfil de un usuario
router.post('/signup', createUser); // crear usuario
router.put('/user/:id', updateUser); // editar usuario
router.delete('/user/:id', deleteUser); // borrar usuario (Solo el admin)

module.exports = router;