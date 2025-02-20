import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import UserModel from "../models/user.model";
import { UserRole } from "../interfaces/User";
import dbaseconnection from "../config/dataBase"
import userModel from "../models/user.model";

// Connect to MongoDB
dbaseconnection();

const generateUsers = async () => {
    try {
        const users = [];
        
        for (let i = 0; i < 1000; i++) {
            const address = await userModel.address.create({
                street: faker.location.street(),
                city: faker.location.city(),
                state: faker.location.state(),
                zip: faker.location.zipCode(),
            });

            users.push({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 8 }), // Ensure a strong password
                role: faker.helpers.arrayElement(Object.values(UserRole)),
                address: address._id,
                phone: faker.phone.number({ style: 'human' }),
                created_at: faker.date.past(),
                updated_at: new Date(),
            });
        }

        await UserModel.User.insertMany(users);
        console.log("✅ 1000 Users inserted successfully!");
    } catch (error) {
        console.error("Error inserting users:", error);
    } finally {
        mongoose.disconnect();
    }
};

generateUsers();
