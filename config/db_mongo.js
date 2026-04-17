const mongoose = require("mongoose");

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const db = mongoose.connection;

  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("connection to MongoDB established"));
};

module.exports = connectDB;