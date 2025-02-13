import categorySchema from "../models/cateogry.model";
import { categoryValidation } from "../validation/category.validation";
import ICategory from "../interfaces/Category";
import { error } from "console";
class CategoryService {
  private isExsiting = (nameofCateogry: string) => {
    return categorySchema.findOne({ name: nameofCateogry });
  };

  async createCateogry(data: any) {
    try {
      const validation = categoryValidation(data);
      if (!validation.success)
        return {
          message: "validation of category failed",
          success: false,
        };
      const found = await this.isExsiting(data.name);
      if (found)
        return {
          message: "Category already exists or change name",
          success: false,
        };
      const { name, description }: ICategory = data;
      await categorySchema.create({
        name,
        description,
      });
      return {
        message: "Category created successfully",
        success: true,
      };
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
      else throw new Error("UnException Error in the category service");
    }
  }

  async getCategories() {
    try {
      const categories = await categorySchema.find();
      if (!categories)
        return {
          message: "Error in getting category data",
          success: false,
          data: undefined,
        };
      return {
        message: "Data got correctly",
        success: true,
        data: categories,
      };
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
      else throw new Error("UnException Error in the category service");
    }
  }
}

export default new CategoryService();
