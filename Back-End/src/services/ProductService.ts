import Product from "../models/product.model";
import IProduct from "../interfaces/Product";
import { validateProduct, validFields } from "../validation/productValidation";
import validateId from "../validation/objectIdValidation";

class ProductService {
  async createProduct(data: IProduct, images: string[]): Promise<IProduct> {
    try {
      const validationResult = validateProduct(data);
      if (!validationResult.success)
        throw new Error(
          validationResult.error.errors.map((e) => e.message).join(", ")
        );

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
      return product;
    } catch (error) {
      throw new Error("Error creating product");
    }
  }

  async getProductByID(productId: string): Promise<IProduct> {
    try {
      const id = productId;
      const validationResult = validateId.validateId(id);
      if (!validationResult.success)
        throw new Error(
          validationResult.error.errors.map((e) => e.message).join(", ")
        );

      const selectedProduct = await Product.findById(id)
        .lean()
        .populate("category_id")
        .populate("subcategory_id");

      if (!selectedProduct) {
        throw new Error("Product not found");
      }
      return selectedProduct;
    } catch (error) {
      throw new Error("Error creating product: ");
    }
  }

  async getProducts(): Promise<IProduct[]> {
    return await Product.find()
      .populate("category_id")
      .populate("subcategory_id");
  }

  async updateProductdetails(data: any) {
    const { _id, ...updateFields } = data;
    if (!_id)
      return {
        success: false,
        message: "invalid Id",
      };

    for (const item of Object.entries(updateFields)) {
      const validate = validFields(item);
      if (validate.success == false)
        return {
          success: false,
          message: validate.message,
        };
    }
    const updatedProduct = await Product.findByIdAndUpdate(_id, data, {
      new: true,
    });

    if (!updatedProduct)
      return {
        success: false,
        message: "can't update the product",
      };
    return {
      success: true,
      message: "Updated successfully",
    };
  }
}

export default new ProductService();
