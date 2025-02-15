import { z , object } from "zod";
import idvalidation from "./objectIdValidation";

export const productValidation = z.object({
  body : object({
    name: z
      .string()
      .min(3, "Product name must be at least 3 characters long")
      .max(100, "Product name must not exceed 100 characters"),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters long")
      .max(500, "Description must not exceed 500 characters"),

    price: z.coerce.number().min(0, "Price must be a positive number"),

    category_id: idvalidation.objectIdSchema,
    subcategory_id: idvalidation.objectIdSchema,

    isStock: z.boolean().optional(),

    // images: z
    //   .array(z.string().url("Invalid image URL"))
    //   .min(1, "At least one image URL is required"),

    quantity: z.coerce.number().min(0, "Quantity cannot be negative")
  }),
  created_at: z.date().optional(), 
  updated_at: z.date().optional(),
});

