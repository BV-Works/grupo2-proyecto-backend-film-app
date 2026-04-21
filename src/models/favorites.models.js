const { DataTypes } = require("sequelize"); 
const sequelize = require("../../config/db_pg.js"); 

const Favorite = sequelize.define("favorite", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
    }, 
    userId: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        // references
    }, 
    movieSource: {
        type: DataTypes.STRING,
        allowNull: false, 
    }, 
    movieSourceId: {
        type: DataTypes.STRING,
        allowNull: false, 

    }
}); 

module.exports = Favorite; 