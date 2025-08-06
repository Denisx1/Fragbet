import { Injectable } from "@nestjs/common";

import Stripe from "stripe";
import { PriceCreationAttrs } from "../interfaces/price-interface";

@Injectable()
export class PriceStripeRepository {
  constructor(private readonly stripe: Stripe) {}
  async createPrice(priceData: PriceCreationAttrs) {
    const price = await this.stripe.prices.create(priceData);
    return price;
  }
}
