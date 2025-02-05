import Product from "../models/product.model";
import IProduct from "../interfaces/Product";
import {validateProduct , validFields} from "../validation/productValidation"
import validateId from "../validation/objectIdValidation"

class ProductService {
  async createProduct(data: IProduct, images: string[]): Promise<IProduct> {
    try {
        const validationResult = validateProduct(data); 
        if(!validationResult.success)
            throw new Error(validationResult.error.errors.map(e => e.message).join(", "));
        
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
      if(!validationResult.success)
         throw new Error (validationResult.error.errors.map(e => e.message).join(", "));
        
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

  async updateProductdetails(id:string , data : any):Promise<boolean>
  {
    for (const item of Object.entries(data)) {
        const validate = validFields (item);
        if (!validate) 
           return false;   
      }
      const updatedProduct = Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!updatedProduct)return false;
    return true;
  }
}

export default new ProductService();
