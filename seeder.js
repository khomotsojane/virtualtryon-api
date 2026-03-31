import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    title: "Slim Fit Blazer",
    price: 1200,
    brand: "ZARA",
    category: "formal",
    gender: "men",
    sizes: ["S", "M", "L"],
    colors: ["black", "navy"],
    fit: "slim",
    occasion: "interview",
    stock: 15,
    images: ["https://via.placeholder.com/300"],
    description: "Perfect blazer for interviews and formal events"
  },
  {
    title: "Casual Oversized T-Shirt",
    price: 350,
    brand: "H&M",
    category: "casual",
    gender: "women",
    sizes: ["S", "M", "L"],
    colors: ["white", "beige"],
    fit: "oversized",
    occasion: "daily",
    stock: 30,
    images: ["https://via.placeholder.com/300"],
    description: "Comfortable oversized tee for everyday wear"
  },
  {
    title: "Skinny Jeans",
    price: 800,
    brand: "LEVIS",
    category: "casual",
    gender: "men",
    sizes: ["30", "32", "34"],
    colors: ["blue", "black"],
    fit: "skinny",
    occasion: "casual",
    stock: 20,
    images: ["https://via.placeholder.com/300"],
    description: "Classic skinny jeans with stretch fit"
  },
  {
    title: "Summer Floral Dress",
    price: 650,
    brand: "ZARA",
    category: "casual",
    gender: "women",
    sizes: ["S", "M", "L"],
    colors: ["red", "yellow"],
    fit: "regular",
    occasion: "date",
    stock: 10,
    images: ["https://via.placeholder.com/300"],
    description: "Light and stylish summer dress"
  },
  {
    title: "Formal White Shirt",
    price: 500,
    brand: "H&M",
    category: "formal",
    gender: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white"],
    fit: "slim",
    occasion: "office",
    stock: 25,
    images: ["https://via.placeholder.com/300"],
    description: "Crisp white shirt for formal occasions"
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/clothingDB"

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Data Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();