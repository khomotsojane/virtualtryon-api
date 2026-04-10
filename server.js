import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/products.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/products", productRoutes);


app.get("/", (req, res) => {
  res.send("API is running");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/clothingDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
