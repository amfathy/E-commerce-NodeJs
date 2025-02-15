import Product from "../models/product.model";
import IProduct from "../interfaces/Product";
import validateId from "../validation/objectIdValidation";

class ProductService {
  async createProduct(data: IProduct, images: string[]) {
    try {
      const product = await Product.create({
        name: data.name,
        description: data.description,
        price: data.price,
        category_id: data.category_id,
        subcategory_id: data.subcategory_id,
        isStock: data.isStock,
        images: images,
        quantity: data.quantity,
      });

      return {
        success: true,
        message: "Product created successfully",
        data: product,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error creating product",
        data: null,
      };
    }
  }

  async getProductByID(productId: string) {
    try {
      const selectedProduct = await Product.findById(productId)
        .lean()
        .populate("category_id")
        .populate("subcategory_id");

      if (!selectedProduct) {
        return {
          success: false,
          message: "Product not found",
          data: null,
        };
      }
      return {
        success: true,
        message: "Product retrieved successfully",
        data: selectedProduct,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error retrieving product",
        data: null,
      };
    }
  }

  async getProducts() {
    try {
      const products = await Product.find()
        .populate("category_id")
        .populate("subcategory_id");

      return {
        success: true,
        message: "Products retrieved successfully",
        data: products,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error retrieving products",
        data: null,
      };
    }
  }

  async updateProductDetails(data: any) {
    try {
      const { _id, ...updateFields } = data;
      if (!_id) {
        return {
          success: false,
          message: "Invalid product ID",
          data: null,
        };
      }
      const updatedProduct = await Product.findByIdAndUpdate(_id, data, {
        new: true,
      });

      if (!updatedProduct) {
        return {
          success: false,
          message: "Failed to update product",
          data: null,
        };
      }
      return {
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error updating product",
        data: null,
      };
    }
  }
}

export default new ProductService();
