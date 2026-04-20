const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    await mongoose.connect(MONGO_URI);

    const db = mongoose.connection;

    db.on("error", (error) => console.error("Mongo error:", error));
    db.once("open", () => console.log("MongoDB connected"));

  } catch (error) {
    console.error("Mongo connection failed:", error);
    throw error;
  }
};

module.exports = connectDB;