import { z } from "zod";

export const CreateDraftPlanDtoSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .number()
    .positive("Price must be positive")
    .transform((val) => Math.round(val * 100)), // Преобразуем цену в центы
  currency: z.enum(["USD", "EUR"]),
  interval: z.enum(["month", "year", "week", "day"]),
});

export type CreateDraftPlanDto = z.infer<typeof CreateDraftPlanDtoSchema>;
