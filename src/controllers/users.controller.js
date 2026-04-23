const { User } = require("../models");

// Obtener todos los usuarios (Admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Busca todos los usuarios en la base de datos
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un usuario por id
const getUser = async (req, res) => {
  try {
    // req.params.id recoge el id que viene en la URL ej: /api/user/1
    const user = await User.findByPk(req.params.id); // Busca por Primary Key, equivale a SELECT * FROM users WHERE id = 1
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" }); // Si findByPk no encuentra nada devuelve null, entonces respondemos con 404
    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Editar usuario
const updateUser = async (req, res) => {
  try {
    // Primero buscamos el usuario para comprobar que existe antes de editarlo
    const user = await User.findByPk(req.params.id); // Busca el usuario por id
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    await user.update(req.body); // Actualiza solo los campos que vienen en el body
    // Devuelve el usuario con los datos ya actualizados
    res.status(200).json({ user: user, message: `Usuario ${ user.name } editado.`});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Borrar usuario (Admin)
const deleteUser = async (req, res) => {
  try {
    // Primero buscamos el usuario para comprobar que existe antes de borrarlo
    const user = await User.findByPk(req.params.id); // Busca el usuario por id
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    // Si no existe devuelve 404
    await user.destroy(); // Hace el DELETE FROM users WHERE id en SQL
    res.status(200).json({ message: `Usuario ${ user.name } eliminado`}); // Confirmamos que el usuario se ha eliminado correctamente
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
