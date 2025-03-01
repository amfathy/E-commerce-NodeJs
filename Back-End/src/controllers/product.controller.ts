import { Request, Response } from "express";
import ProductService from "../services/ProductService";
import {  getEntity , getAllEntities ,updateEntity,deleteEntity } from "./Crud.factory.controller";
import Product from "../models/product.model";

class ProductController {

   getProduct = getEntity(Product);
   getAllProduct = getAllEntities(Product);
   updateProduct = updateEntity(Product);
   deleteProduct = deleteEntity(Product);

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const images = req.files
        ? (req.files as Express.Multer.File[]).map((file) => file.path)
        : [];

      if (images.length === 0) {
        res.status(400).json({ success: false, message: "At least one image is required", data: null });
        return;
      }

      const createdProduct = await ProductService.createProduct(req.body, images);
      res.status(createdProduct.success ? 201 : 400).json(createdProduct);
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : "An unknown error occurred", data: null });
    }
  }
}

export default new ProductController();
