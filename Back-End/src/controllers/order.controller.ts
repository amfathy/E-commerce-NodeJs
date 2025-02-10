import { Request, Response } from "express";
import orderService from "../services/order.service";
const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const creation = await orderService.createOrder(req.body);
    if (!creation.success)
      res.status(401).json(`Failed creation of order: ${creation.message}`);
    else res.status(201).json("created successfully");
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res
          .status(500)
          .json({
            message: "An exception error occurred in controlling order",
          });
  }
};

const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await orderService.getOrders();
    if (!orders.success) res.status(401).json(`error : ${orders.message}`);
    res.status(200).json(orders.data);
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: "error occurred in controlling" });
  }
};

export default {
  createOrder,
   getOrders,
};
