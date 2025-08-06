import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class ProductStripeRepository {
  constructor(private readonly stripe: Stripe) {}

  async createProduct(name: string) {
    return this.stripe.products.create({
      name,
    });
  }
}
