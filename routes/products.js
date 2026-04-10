// routes/products.js
import upload from "../middleware/upload.js";
import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// SEARCH ( important for your AI search)
router.get("/search", async (req, res) => {
  const q = req.query.q;

  const products = await Product.find({
    title: { $regex: q, $options: "i" }
  });

  res.json(products);
});

// ADD product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file.path; 
    const product = new Product({
      ...req.body,
      image: imageUrl,
    });

    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;