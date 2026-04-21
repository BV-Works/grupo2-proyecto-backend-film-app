const User = require("./User");
const Favorite = require("./favorites.models");

User.hasMany(Favorite, {
  foreignKey: "id",
  as: "user",
});

Favorite.belongsTo(User, {
  foreignKey: "id",
  as: "user",
});

module.exports = {
  User,
  Favorite,
};