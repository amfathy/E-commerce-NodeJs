import { Types , Document} from "mongoose";

interface IOrder extends Document{
    user_id: Types.ObjectId;
    items: IOrderItem[];
    total: number;
    created_at: Date;
    updated_at: Date;
    status: OrderStatus;

}

interface IOrderItem extends Document{
    quantity: number; 
    price: number; 
    product_id: Types.ObjectId;
}

enum OrderStatus {
    Pending = "pending",
    Completed = "completed",
    Canceled = "canceled",
}

export type { IOrder, IOrderItem };
export { OrderStatus };