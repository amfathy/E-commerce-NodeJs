import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import Category from "../models/cateogry.model"; 
import connectDB from "../config/dataBase";

dotenv.config(); // Load environment variables

// ✅ Connect to MongoDB
connectDB();


// ✅ Generate Fake Category Data
const generateFakeCategory = () => ({
  name: faker.commerce.department(),
  description: faker.lorem.sentence(10),
  created_at: new Date(),
  updated_at: new Date(),
});

// ✅ Insert 10 Categories
const seedCategories = async () => {
  try {
    await connectDB();
    console.log("🌱 Seeding Categories...");

    const fakeCategories = Array.from({ length: 10 }, generateFakeCategory);
    await Category.insertMany(fakeCategories);

    console.log("✅ Successfully inserted 10 categories!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
    process.exit(1);
  }
};

seedCategories();

//Run this terminal command 
// tsx src/faker/seedCategories.ts

