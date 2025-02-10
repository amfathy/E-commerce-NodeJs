import { Request, Response } from "express";
import ProductService from '../services/ProductService'
class ProductController {

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
        const images = req.files
          ? (req.files as Express.Multer.File[]).map((file) => file.path)
          : [];
        if (images.length === 0)
        {
          res.status(400).json({ message: "At least one image is required" });
          return ; 
        }
        const createdProduct = await ProductService.createProduct(req.body, images);
        res.status(201).json({
        message: "Product created successfully",
        product: createdProduct,
      });
    } catch (err) {
      err instanceof Error
        ? res.status(500).json({ message: err.message })
        : res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = ProductService.getProducts();
      res.status(200).json(products);
    } catch (err) {
      err instanceof Error
        ? res.status(500).json({ message: err.message })
        : res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.query.id as string;
      if (!id) {
        res.status(400).json({ message: "Product ID is required" });
        return;
      }
      const selectedProduct = await ProductService.getProductByID(id);
      res.status(200).json(selectedProduct);[]
    } catch (err) {
      err instanceof Error
        ? res.status(500).json({ message: err.message })
        : res.status(500).json({ message: "An unknown error occurred" });
    }
  }

  async changeProductDetails(req: Request, res: Response): Promise<void> {
    try {
      const updatefield = await ProductService.updateProductdetails(req.body);
      
      if(updatefield.success==false){   
        res.status(400).json({ message: updatefield.message });
        return ; 
      }

      res.status(201).json({message : "Updated sucessfully----"});
    } catch (err) {
      err instanceof Error
        ? res.status(400).json(err.message)
        : res.status(400).json("unknown Error");
    }
  }


}

export default new ProductController();