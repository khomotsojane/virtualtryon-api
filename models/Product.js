
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  category: String,
  brand: String,
  sizes: [String],
  colors: [String],
  description: String,
});

export default mongoose.model("Product", productSchema);