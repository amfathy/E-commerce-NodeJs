import {z , object} from 'zod' 
import idValidation from './objectIdValidation'
import { OrderStatus } from "../interfaces/Order";

const item_validation = z.object ({
    product_id : idValidation.objectIdSchema , 
    quantity: z.number().min(1, "Quantity must be at least 1"),
    price: z.number().min(0, "Price must be a positive number"),
});

export const orderValidation = z.object({
  body : object({  
    user_id: idValidation.objectIdSchema,
    items: z.array(item_validation).min(1, "At least one order item is required"),
    total: z.number().min(0, "Total must be a positive number"),
    status: z.nativeEnum(OrderStatus).default(OrderStatus.Pending),
  })
});

