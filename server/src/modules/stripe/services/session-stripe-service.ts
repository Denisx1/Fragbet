import { Injectable } from "@nestjs/common";
import { SessionStripeRepository } from "../repositories/session-stripe-repository";

@Injectable()
export class SessionStripeService {
  constructor(
    private readonly sessionStripeRepository: SessionStripeRepository
  ) {}
  async createCheckoutSession() {}
}
