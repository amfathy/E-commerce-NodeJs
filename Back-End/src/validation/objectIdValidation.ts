import { z , object } from "zod";

export const objectIdSchema = z
  .string()
  .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
    message: "Invalid MongoDB ObjectId format",
  });

  export const validateId = object({
    params: object({
    id: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: "Invalid MongoDB ObjectId format",
    }),
  }),
});

