const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in .env");
    }

    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("✅ MongoDB connected successfully".bgGreen.bold);
  } 
  catch (err) {
    console.log("❌ MongoDB connection error:".bgRed, err);
    process.exit(1)
  }
};

connectDB();

module.exports = connectDB;
