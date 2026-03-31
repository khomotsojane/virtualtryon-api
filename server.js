// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/clothingDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error", err));


app.use("/api/products", productRoutes);


app.get("/", (req, res) => {
  res.send("Clothing API is running");
});


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});