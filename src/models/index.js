const User = require("./User");
const Favorite = require("./favorites.models");

User.hasMany(Favorite, {
  foreignKey: "userId",
  as: "favorites",
});

Favorite.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = {
  User,
  Favorite,
};