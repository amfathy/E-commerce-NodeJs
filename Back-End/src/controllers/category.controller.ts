import { Request, Response } from "express";
import categoryService from "../services/categoryService";

const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const creation = await categoryService.createCateogry(req.body);
    if (!creation.success) {
      res.status(401).json({ message: creation.message });
      return;
    }
    res.status(201).json({ message: "Category created successfully" });
    return;
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: "An unknown error occurred" });
  }
};

const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const getting = await categoryService.getCategories();
    if (!getting.success) {
      res.status(401).json({ message: getting.message });
    }
    res.status(200).json({ message: getting.message, Data: getting.data });
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
