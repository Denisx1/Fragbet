import { z } from "zod";

export const createPaymentSchema = z.object({
  userId: z.number(),
  subscriptionId: z.number(),
});

export type CreatePaymentDto = z.infer<typeof createPaymentSchema>;