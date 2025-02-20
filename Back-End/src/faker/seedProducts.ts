import mongoose from "mongoose";
import Product from "../models/product.model";
import { faker } from "@faker-js/faker";
import Category from "../models/cateogry.model";
import Subcategory from "../models/subcategory.model";
import dbaseconnection from "../config/dataBase"
async function seedProducts() {
    try {
        await dbaseconnection();

        const categories = await Category.find();
        const subcategories = await Subcategory.find();

        if (categories.length === 0 || subcategories.length === 0) {
            console.log("Please seed categories and subcategories first.");
            return;
        }

        const products = [];
        for (let i = 0; i < 30000; i++) {
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            const randomSubcategory = subcategories
                .filter(sub => sub.category_id.equals(randomCategory._id))[Math.floor(Math.random() * subcategories.length)];

            if (!randomSubcategory) continue;

            products.push({
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
                category_id: randomCategory._id,
                subcategory_id: randomSubcategory._id,
                isStock: faker.datatype.boolean(),
                images: [faker.image.url()],
                quantity: faker.number.int({ min: 1, max: 500 }),
                created_at: new Date(),
                updated_at: new Date()
            });
        }

        await Product.insertMany(products);
        console.log("✅ Successfully inserted 30000 products!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error seeding products:", error);
        mongoose.connection.close();
    }
}

seedProducts();

