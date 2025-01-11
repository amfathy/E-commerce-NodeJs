import { Schema } from 'mongoose';
import IProduct from '../interfaces/Product';
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema<IProduct>({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minlength: [3, "Product name must be at least 3 characters long"],
        maxlength: [100, "Product name must not exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true,
        minlength: [10, "Description must be at least 10 characters long"],
        maxlength: [500, "Description must not exceed 500 characters"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"]
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Category ID is required"]
    },
    subcategory_id: {
        type: Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: [true, "Subcategory ID is required"]
    },
    isStock: {
        type: Boolean,
        default: true
    },
    images: {
        type: [String],
        required: [true, "At least one image URL is required"],
        validate: {
            validator: function (value: string[]) {
                return value && value.length > 0;  
            },
            message: "Product must have at least one image"
        }
    }
    ,
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity cannot be negative"]
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

productSchema.set('toJSON', {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  });

productSchema.pre<IProduct>('save', function (next) {
    this.updated_at = new Date();
    next();
});


const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
