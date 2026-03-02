require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);