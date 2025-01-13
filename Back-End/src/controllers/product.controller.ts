import { Request, Response } from "express";
import Product from "../models/product.model";
import IProduct from "../interfaces/Product";
import { promises } from "dns";

const createProduct = async (req: Request, res: Response): Promise<void> => {
  const images = req.files
    ? (req.files as Express.Multer.File[]).map((file) => file.path)
    : [];
  if (images.length === 0) {
    res.status(400).json({ message: "At least one image is required" });
    return;
  }

  try {
    const {
      name,
      description,
      price,
      category_id,
      subcategory_id,
      isStock,
      quantity,
    }: IProduct = req.body;
    await Product.create({
      name,
      description,
      price,
      category_id,
      subcategory_id,
      isStock,
      images,
      quantity,
    });

    res.status(201).json({ message: "Product created successfully" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find()
      .populate("category_id")
      .populate("subcategory_id");
    res.status(200).json(products);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};


const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {

    const id = req.query.id ;
    console.log(id); 
    const selectedProduct = await Product.findById(id)
      .lean()
      .populate("category_id")
      .populate("subcategory_id");
      if (!selectedProduct) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
    const { stringify } = await import('flatted');
    res.status(200).json(selectedProduct);

    
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};







export default {
  createProduct,
  getProducts,
  getProductById,

};

