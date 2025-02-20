import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import OrderModel from "../models/order.model";
import Product from "../models/product.model";
import UserModel from "../models/user.model";
import { OrderStatus } from "../interfaces/Order";
import dbconnection from "../config/dataBase"

// Connect to MongoDB
dbconnection();

const generateOrders = async () => {
    try {
        const users = await UserModel.User.find({}, "_id");  // Get all user IDs
        const products = await Product.find({}, "_id price");  // Get all product IDs and prices

        if (users.length === 0 || products.length === 0) {
            console.error("No users or products found! Seed users and products first.");
            return;
        }

        const orders = [];
        
        for (let i = 0; i < 1000; i++) {
            const randomUser = faker.helpers.arrayElement(users);
            const itemsCount = faker.number.int({ min: 1, max: 5 });

            const orderItems = [];
            let totalAmount = 0;

            for (let j = 0; j < itemsCount; j++) {
                const product = faker.helpers.arrayElement(products);
                const quantity = faker.number.int({ min: 1, max: 5 });
                const itemTotal = product.price * quantity;

                orderItems.push({
                    product_id: product._id,
                    quantity,
                    price: product.price,
                });

                totalAmount += itemTotal;
            }

            orders.push({
                user_id: randomUser._id,
                items: orderItems,
                total: totalAmount,
                status: faker.helpers.arrayElement(Object.values(OrderStatus)),
                created_at: faker.date.past(),
                updated_at: new Date(),
            });
        }

        await OrderModel.Order.insertMany(orders);
        console.log("✅ 1000 Orders inserted successfully!");
    } catch (error) {
        console.error("Error inserting orders:", error);
    } finally {
        mongoose.disconnect();
    }
};

generateOrders();
