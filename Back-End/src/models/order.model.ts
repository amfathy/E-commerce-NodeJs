import { IOrderItem, OrderStatus, IOrder } from "../interfaces/Order";
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema<IOrderItem>({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, "Product ID is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"]
    },
});

const orderSchema = new mongoose.Schema<IOrder>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"]
    },
    items: {
        type: [orderItemSchema],
        required: [true, "At least one order item is required"],
        validate: {
            validator: function (value: IOrderItem[]) {
                return value.length > 0;
            },
            message: "Order must have at least one item"
        }
    },
    total: {
        type: Number,
        required: [true, "Total amount is required"],
        min: [0, "Total must be a positive number"]
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Pending
    }
});

orderSchema.pre<IOrder>('save', function (next) {
    this.updated_at = new Date();
    next();
});

export const OrderItem = mongoose.model<IOrderItem>('OrderItem', orderItemSchema);
export const Order = mongoose.model<IOrder>('Order', orderSchema);


