import { Schema } from "mongoose";
import { IOrder } from "../interfaces/Order";
import { IOrderItem } from "../interfaces/Order";
import OrderModel from "../models/order.model";
import { Request, Response } from "express";

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, items, total, status }: IOrder = req.body;
    if (!items || !Array.isArray(items) || items.length === 0)
      res.status(400).json({ message: "Items array cannot be empty." });

    const itemsofOrder: IOrderItem[] = items.map(
      ({ product_id, quantity, price }) => ({
        quantity,
        price,
        product_id,
      })
    );

    const order = await OrderModel.Order.create({
      user_id,
      items: itemsofOrder,
      total,
      status,
    });

    res.status(201).json(order);
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: "An unknown error occurred" });
  }
};

const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await OrderModel.Order.find();
    res.status(200).json(orders);
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: "An unknown error occurred" });
  }
};



export default {
  createOrder,
  getOrders,
};
