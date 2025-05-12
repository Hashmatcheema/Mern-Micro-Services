const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1", userRoutes);

const PORT = process.env.PORT || 3002;

mongoose
  .connect(process.env.MONGODB_URI) // Remove options
  .then(() => {
    app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));