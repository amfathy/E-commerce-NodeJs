import { Request, Response } from "express";
import SubcategoryService from "../services/subcategory.validation";

const createSubcategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const creating = await SubcategoryService.createSubcategory(req.body);
    if (!creating.success) {
      res.status(401).json(creating.message);
      return;
    }
    res.status(201).json({ message: "Subcategory created successfully" });
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: "An unknown error occurred" });
  }
};

const getSubcategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const gettingData = await SubcategoryService.getSubcategories();
    if (!gettingData.success) {
      res.status(401).json(gettingData.message);
      return;
    }
    res.status(200).json(gettingData.data);
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: "An unknown error occurred" });
  }
};

export default {
  createSubcategory,
  getSubcategories,
};
