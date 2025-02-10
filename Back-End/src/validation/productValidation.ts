import { z } from "zod";
import idvalidation from "./objectIdValidation";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters long")
    .max(100, "Product name must not exceed 100 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description must not exceed 500 characters"),

  price: z.number().min(0, "Price must be a positive number"),

  category_id: idvalidation.objectIdSchema,
  subcategory_id: idvalidation.objectIdSchema,

  isStock: z.boolean().optional(), // Default value is handled in Mongoose

  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image URL is required"),

  quantity: z.number().min(0, "Quantity cannot be negative"),

  created_at: z.date().optional(), // Optional since Mongoose handles default values
  updated_at: z.date().optional(),
});
export const validFieldsMap: { [key: string]: (value: any) => boolean } = {
  quantity: (value) => typeof value === "number" && value >= 0,
  title: (value) => typeof value === "string" && value.trim().length > 0,
  price: (value) => typeof value === "number" && value >= 0,
  description: (value) =>
    typeof value === "string" && value.trim().length > 0,
};

export const validFields = (data: any) => {
  
      const validate = validFieldsMap[data.key] ;

      if (!validate) {
          return {
              success: false,
              message: `invalid field ${data.key}` 
          };
      

      if (!validate(data.value)) {
          return {
              success: false,
              message: `invalid input for field '${data.key}': ${data.value}`
          };
      }
  }

  return {
      success: true,
      message: "true validation"
  };
};


export const validateProduct = (data: any) => {
  return productSchema.safeParse(data);
};
