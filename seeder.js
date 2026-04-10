import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import cloudinary from "./config/cloudinary.js";

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
    images: [
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1520975693411-b6d3a0b8b8f6"
    ],
    description: "Perfect blazer for interviews"
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
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ac"
    ],
    description: "Comfortable oversized tee"
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
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3247"
    ],
    description: "Classic skinny jeans"
  }
];

const uploadImages = async (imageUrls) => {
  const uploaded = [];

  for (let url of imageUrls) {
    try {
      const res = await cloudinary.uploader.upload(url, {
        folder: "clothing",
      });

      uploaded.push(res.secure_url);
    } catch (error) {
      console.log("Failed upload:", url);
    }
  }

  return uploaded;
};

const seedData = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/clothingDB"
    );

    console.log("MongoDB Connected ");

  
    await Product.deleteMany();

    const updatedProducts = [];

    for (let product of products) {
      const uploadedImages = await uploadImages(product.images);

      updatedProducts.push({
        ...product,
        images: uploadedImages,
      });
    }

    await Product.insertMany(updatedProducts);

    console.log("Data Seeded Successfully with Cloudinary Images");
    process.exit();
  } catch (error) {
    console.error("Seeder Error:", error);
    process.exit(1);
  }
};

seedData();