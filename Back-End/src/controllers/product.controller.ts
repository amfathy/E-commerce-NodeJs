import { Request, Response } from "express";
import IProduct from "../interfaces/Product";
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
        const {
          name,
          description,
          price,
          category_id,
          subcategory_id,
          isStock,
          quantity,
        }: IProduct = req.body;
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
      const { _id, ...updateFields } = req.body;
      if (!_id)
      {
        res.status(401).json("Invalid Id");
        return ;
      }
      const updatefield = ProductService.updateProductdetails(_id ,updateFields);
      if(!updateFields){
        res.status(400).json({ message: "failed updating" });
        return ;
      }
      res.status(201).json({message : "Updated sucessfully"})
    } catch (err) {
      err instanceof Error
        ? res.status(400).json(err.message)
        : res.status(400).json("unknown Error");
    }
  }
}

export default new ProductController();
