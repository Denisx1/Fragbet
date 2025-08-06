import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class ChargeStripeRepository {
  constructor(private readonly stripe: Stripe) {}
  async chargeRetrieve(chargeId: string) {
    const charge = await this.stripe.charges.retrieve(chargeId);
    return charge;
  }
}
