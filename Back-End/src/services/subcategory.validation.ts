import ISubcategory from "../interfaces/Subcategory";
import subCategorySchema from "../models/subcategory.model";
import { subcategoryValidation } from "../validation/subCategory.validation";

class SubcategoryService {
  private async isExsiting(nameOfSub: string) {
    return subCategorySchema.findOne({ name: nameOfSub });
  }

  async createSubcategory(data: any) {
    try {
      const existing = await this.isExsiting(data.name);
      if (existing)
        return {
          message: "subcategory is exist",
          success: false,
        };
      const validation = subcategoryValidation(data);
      if (!validation.success)
        return {
          message: validation.error.errors,
          success: false,
        };
      const { name, category_id }: ISubcategory = data;
      await subCategorySchema.create({
        name,
        category_id,
      });
      return {
        message: "subCategory Created successfully",
        success: true,
      };
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
      else throw new Error("Exeptional Error from subcategory service");
    }
  }

  async getSubcategories() {
    try {
      const subcategories = await subCategorySchema.find();
      if (!subCategorySchema)
        return {
          message: "error with getting data in service",
          success: false,
        };
      return {
        message: "Data got successfully",
        success: true,
        data : subcategories
      };
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
      else throw new Error("Eceptional Error from subcategory service");
    }
  }
}

export default new SubcategoryService();
