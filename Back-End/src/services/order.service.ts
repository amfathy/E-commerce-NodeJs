import Ordervalidation from "../validation/order.validation";
import { IOrder, IOrderItem } from "../interfaces/Order";
import orderSchema from "../models/order.model";
//IorderItem

class OrderService {
  async createOrder(data: any) {
    try {
      const validation = Ordervalidation(data);
      if (!validation.success)
        return {
          message: `alidation failed check inputs: ${validation.error}`,
          success: false,
        };

      const { user_id, items, total, status }: IOrder = data;
      if (!items || !Array.isArray(items) || items.length === 0)
        return {
          message: "Items array cannot be empty.",
          success: false,
        };
     
      for(let item of items)
      {
        await orderSchema.OrderItem.create({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price
          });
      }
      
      const order = await orderSchema.Order.create({
        user_id,
        items: items,
        total,
        status,
      });

      if(!order)
        return {
            message: "creation failed from schema",
            success: false,
          };
      return {
        message: "order added successfully",
        success: true,
      };
    } catch (err) {
      if (err instanceof Error)
        return {
          message: err.message,
          success: false,
        };
      else
        return {
          message: "exceptional error in the order servive",
          success: false,
        };
    }
  }
  async getOrders(){
    try{
        const order = await orderSchema.Order.find();
        if(!order)
            return {
                message : "Failed gitten",
                success : false 
                ,data : undefined  

            }
        return {
            message : "Created successfully",
            success : true ,
            data : order 
        }
    }catch(err)
    {
        if(err instanceof Error)
            return {
                message : err.message as string ,
                success : false
                ,data : undefined  
    
            }
        else return {
            message : "Exceptional error in serving order",
            success : false   
            ,data : undefined  
        }
    }
  }
  




}

export default new OrderService 
