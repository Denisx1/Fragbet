import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;