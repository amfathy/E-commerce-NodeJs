import mongoose from "mongoose";
import { faker } from "@faker-js/faker"; 
import Category from "../models/cateogry.model";
import Subcategory from "../models/subcategory.model";
import dotenv from "dotenv";
import dbconnection from "../config/dataBase"
dotenv.config(); 

dbconnection(); 

const seedSubcategories = async () => {
  try {
    dbconnection(); 
    console.log("Connected to MongoDB ✅");

    // Fetch all categories
    const categories = await Category.find();
    if (categories.length === 0) {
      console.log("No categories found. Please seed categories first.");
      return;
    }

    const subcategoriesData = [];

    for (let i = 0; i < 10; i++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];

      subcategoriesData.push({
        name: faker.commerce.department(), 
        category_id: randomCategory._id,
      });
    }

    await Subcategory.insertMany(subcategoriesData);
    console.log("Subcategories seeded successfully 🎉");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding subcategories:", error);
    mongoose.connection.close();
  }
};

seedSubcategories();
