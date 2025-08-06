import { z } from "zod";
import { SubscriptionStatus } from "../enums/subscription-status.enum";

export const UpdateSubscriptionDtoSchema = z.object({
  updateAt: z.date(),
  status: z.enum([
    SubscriptionStatus.ACTIVE,
    SubscriptionStatus.CANCELED,
    SubscriptionStatus.EXPIRED,
    SubscriptionStatus.INITIALIZED,
  ] as const),
  endDate: z.date().optional(),
  startDate: z.date().optional(),
  subscriptionStripeId: z.string().optional(),
});

export type UpdateSubscriptionDto = z.infer<typeof UpdateSubscriptionDtoSchema>;
