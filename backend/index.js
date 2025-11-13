const express = require("express");
require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");
const homeRoutes = require("./routes/homeRoutes");
const notesRouter = require("./routes/notesRoutes");

const app = express();
connectDB;

app.use(cors());
app.use(express.json());

app.use("/", homeRoutes);
app.use("/api/notes", notesRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`.bgRed);
});
