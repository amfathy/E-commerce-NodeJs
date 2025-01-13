import ICategory from "../interfaces/Category";
import { Request, Response } from "express";
import Category from "../models/cateogry.model";

const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const isExsiting = await Category.findOne({ name: req.body.name });
    if (isExsiting)
      res
        .status(400)
        .json({ message: "Category already exists or change name" });

    const { name, description }: ICategory = req.body;
    await Category.create({
      name,
      description,
    });
    res.status(201).json({ message: "Category created successfully" });
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: "An unknown error occurred" });
  }
};

const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: "An unknown error occurred" });
  }
};

export default {
  createCategory,
  getCategories,
};
