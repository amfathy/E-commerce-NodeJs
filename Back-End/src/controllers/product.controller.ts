import { Request, Response } from "express";
import ProductService from "../services/ProductService";

class ProductController {
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

  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductService.getProducts();
      res.status(products.success ? 200 : 500).json(products);
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : "An unknown error occurred", data: null });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).json({ success: false, message: "Product ID is required", data: null });
        return;
      }
      const selectedProduct = await ProductService.getProductByID(id);
      res.status(selectedProduct.success ? 200 : 400).json(selectedProduct);
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : "An unknown error occurred", data: null });
    }
  }

  async changeProductDetails(req: Request, res: Response): Promise<void> {
    try {
      const updateResponse = await ProductService.updateProductDetails(req.body);
      res.status(updateResponse.success ? 200 : 400).json(updateResponse);
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : "An unknown error occurred", data: null });
    }
  }
}

export default new ProductController();
