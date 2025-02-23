import { z,object } from "zod";
import {objectIdSchema} from "./objectIdValidation";

export const subcategoryValidation = z.object({
  body: object({
    name: z.string().min(3).max(50),

    category_id: objectIdSchema,
  }),

  updated_at: z.date().optional(),
  created_at: z.date().optional(),
});
