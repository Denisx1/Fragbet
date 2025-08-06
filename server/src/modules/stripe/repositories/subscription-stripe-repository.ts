import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class SubscriptionStripeRepository {
  constructor(private readonly stripe: Stripe) {}
  async cancelSubscription(subscriptionId: string) {
    try {
      const subscription = await this.stripe.subscriptions.update(
        subscriptionId,
        {
          cancel_at_period_end: true,
        }
      );
      return subscription;
    } catch (error) {
      throw error;
    }
  }
  async subscriptionRetrieve(subscriptionId: string) {
    try {
      const subscription =
        await this.stripe.subscriptions.retrieve(subscriptionId);
      return subscription;
    } catch (error) {
      throw error;
    }
  }
  async subscriptionUpdate(
    subscriptionId: string,
    stripeSubscriptionUpdateAttrs: Stripe.SubscriptionUpdateParams
  ) {
    try {
      const subscription = await this.stripe.subscriptions.update(
        subscriptionId,
        stripeSubscriptionUpdateAttrs
      );
      return subscription;
    } catch (error) {
      throw error;
    }
  }
  async getSubscription(customerStripeId: string) {
    try {
      const subscription = await this.stripe.subscriptions.list({
        customer: customerStripeId,
      });
      return subscription;
    } catch (error) {
      throw error;
    }
  }
}
