import ISubcategory from "../interfaces/Subcategory";
import Subcategory from "../models/subcategory.model";
import { Request, Response } from "express";
import Subcategoryvalidator from "../validation/subCategory.validation";

const validation = (body: unknown) => {
  return Subcategoryvalidator.safeParse(body);
};

const isExsiting = (nameOfSub: string) => {
  return Subcategory.findOne({ name: nameOfSub });
};

const createSubcategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const parsedData = validation(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: parsedData.error.errors, // Zod validation error details
    });
    return;
  }

  try {
    const Found = await isExsiting(req.body.name);
    if (Found) {
      res
        .status(400)
        .json({ message: "Subcategory already exists or change name" });
      return;
    }

    const { name, category_id }: ISubcategory = req.body;
    await Subcategory.create({
      name,
      category_id,
    });
    res.status(201).json({ message: "Subcategory created successfully" });
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: "An unknown error occurred" });
  }
};

const getSubcategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const subcategories = await Subcategory.find();
    res.status(200).json(subcategories);
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
