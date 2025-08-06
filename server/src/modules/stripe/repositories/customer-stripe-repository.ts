import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class CustomerStripeRepository {
  constructor(private readonly stripe: Stripe) {}

  async createCustomer(email: string) {
    try {
      const customer = await this.stripe.customers.create({
        email,
      });
      return customer;
    } catch (error) {
      throw error;
    }
  }
}
