import Product from "../models/product.model";
import IProduct from "../interfaces/Product";

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
}
export default new ProductService();
