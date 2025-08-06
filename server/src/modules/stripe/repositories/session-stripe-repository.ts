import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { CreateSessionAttrs } from "../interfaces/session-create-interface";
import { PaymentRepository } from "src/modules/payment/payment.repository";
import { PaymentCreationAttrs } from "src/modules/payment/interfaces/payment.inteface";
import { CustomException } from "src/common/exceptions/custom.exception";
import { StripeExceptionCodes } from "../enums/stripe-exceptions.enum";
import { ModuleType } from "src/common/exceptions/enums";

@Injectable()
export class SessionStripeRepository {
  constructor(
    private readonly stripe: Stripe,
    private readonly paymentRepository: PaymentRepository
  ) {}
  async createCheckoutSession(
    payload: CreateSessionAttrs,
    localPaymentIntendId: number
  ): Promise<string> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: payload.priceStripeId,
            quantity: payload.quantity || 1,
          },
        ],
        mode: "subscription",
        success_url: "http://localhost:3000/subscription/success",
        cancel_url: "http://localhost:3000/subscription/cancel",
        customer: payload.customerStripeId,
        subscription_data: {
          metadata: {
            paymentId: localPaymentIntendId.toString(),
            planId: payload.planId.toString(),
            userId: payload.userId.toString(),
          },
        },
        metadata: {
          userId: payload.userId.toString(),
          planId: payload.planId.toString(),
          interval: payload.interval,
        },
      });
      if (!session.url) {
        throw new CustomException({
          message: "Failed to create checkout session",
          statusCode: 500,
          errorCode: StripeExceptionCodes.FAILED_TO_CREATE_CHECKOUT_SESSION,
          module: ModuleType.STRIPE_MODULE,
        });
      }
      return session.url;
    } catch (error) {
      throw error;
    }
  }
}
