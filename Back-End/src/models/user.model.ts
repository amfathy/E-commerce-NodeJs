import mongoose, { Schema, Types } from "mongoose";
import { IUser, UserRole, Address } from "../interfaces/User";
// import bcrypt from "bcrypt";

const addressSchema = new mongoose.Schema<Address>({
    street: {
        type: String,
        required: [true, "Street is required"],
        trim: true,
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
    },
    state: {
        type: String,
        required: [true, "State is required"],
        trim: true,
    },
    zip: {
        type: String,
        required: [true, "ZIP code is required"],
        match: [/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"],
    },
});



const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [50, "Name must not exceed 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Invalid email address format"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.Guest,
    },
    address: {
        type: Types.ObjectId,
        ref: "Address",
        required: [true, "Address ID is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^\+?\d{10,15}$/, "Invalid phone number format"]
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
});

// // Pre-save hook to hash password and update `updated_at` for User
// userSchema.pre<IUser>("save", async function (next) {
//     if (this.isModified("password")) {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//     }
//     this.updated_at = new Date();
//     next();
// });


const Address = mongoose.model<Address>("Address", addressSchema);
const User = mongoose.model<IUser>("User", userSchema);


export default {
    User,
    Address,
};
