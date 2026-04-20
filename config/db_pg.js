require("dotenv").config();

const { Sequelize } = require("sequelize");

if (
  !process.env.DB_HOST ||
  !process.env.DB_USER ||
  !process.env.DB_PORT ||
  !process.env.DB_DATABASE ||
  !process.env.DB_PASSWORD
) {
  throw new Error("Missing environment variables");
}

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
);

module.exports = sequelize;
