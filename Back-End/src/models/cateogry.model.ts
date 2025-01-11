import ICategory from "../interfaces/Category";
import mongoose, { Schema, Document } from "mongoose";

// Define the schema
const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
        minlength: [3, "Category name must be at least 3 characters long"],
        maxlength: [50, "Category name must not exceed 50 characters"]
    },
    description: {
        type: String,
        required: [true, "Category description is required"],
        trim: true,
        minlength: [10, "Description must be at least 10 characters long"],
        maxlength: [200, "Description must not exceed 200 characters"]
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

categorySchema.pre<ICategory>("save", function (next) {
    this.updated_at = new Date();
    next();
});

categorySchema.path("name").validate((value: string) => {
    return /^[a-zA-Z0-9\s]+$/.test(value);
}, "Category name can only contain alphanumeric characters and spaces");

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
