const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/v1", authRoutes);

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGODB_URI) // Remove options
  .then(() => {
    app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
  })
  .catch((err) => console.log(err));