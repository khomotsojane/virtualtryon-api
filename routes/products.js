// routes/products.js
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
router.post("/", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

export default router;