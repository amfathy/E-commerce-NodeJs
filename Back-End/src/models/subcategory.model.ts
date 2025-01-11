import ISubcategory from '../interfaces/Subcategory';
import mongoose, { Schema } from 'mongoose';

const subcategorySchema = new mongoose.Schema<ISubcategory>({
    name: {
        type: String,
        required: [true, "Subcategory name is required"],
        unique: true,
        trim: true,
        minlength: [3, "Subcategory name must be at least 3 characters long"],
        maxlength: [50, "Subcategory name must not exceed 50 characters"]
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Category ID is required"]
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

// Pre-save hook to update `updated_at` timestamp
subcategorySchema.pre<ISubcategory>('save', function (next) {
    this.updated_at = new Date();
    next();
});

// Model creation
const Subcategory = mongoose.model<ISubcategory>('Subcategory', subcategorySchema);
export default Subcategory;
