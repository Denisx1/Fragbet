import { PlanInterval } from "src/modules/plan/enums/plan-interval.enam";

export interface CreateSessionAttrs {
  userId: number;
  priceStripeId: string; // это Stripe Price ID (например, price_abc123)
  planId: number;
  interval: PlanInterval;
  quantity?: number; // по умолчанию 1
  customerStripeId: string;
}
