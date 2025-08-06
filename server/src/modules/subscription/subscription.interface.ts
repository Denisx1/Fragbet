import { SubscriptionStatus } from "./enums/subscription-status.enum";
import { ProductPlan } from "../plan/plan-model";
import { User } from "../user/user.model";

export interface SubscriptionData extends SubscriptionCreationAttrs {
  id: number;
  plan: ProductPlan;
  user: User;
  startDate: Date;
  endDate: Date;
}

export interface SubscriptionCreationAttrs {
  userId: number;
  planId: number;
  status: SubscriptionStatus;
  subscriptionStripeId: string;
}
