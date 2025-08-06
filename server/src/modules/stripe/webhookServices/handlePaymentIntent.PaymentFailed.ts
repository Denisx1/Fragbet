import { Injectable } from "@nestjs/common";
import { CustomException } from "src/common/exceptions/custom.exception";
import { UserRepository } from "src/modules/user/user.repository";
import Stripe from "stripe";
import { StripeExceptionCodes } from "../enums/stripe-exceptions.enum";
import { ModuleType } from "src/common/exceptions/enums";
import { User } from "src/modules/user/user.model";
import { PaymentRepository } from "src/modules/payment/payment.repository";
import { PaymentStatus } from "src/enums/payment-status.enum";
import { ChargeStripeRepository } from "../repositories/charge-stripe-repository";
import { InvoiceStripeRepository } from "../repositories/invoice-stripe-repository";
import { Payment } from "src/modules/payment/payment.model";


@Injectable()
export class HandlePaymentIntentPaymentFailed {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly paymentRepository: PaymentRepository,
  ) {}
  async handle(paymentIntent: Stripe.PaymentIntent) {
    try {
      const localPaymentIntend = await this.getPaymentIntend(
        paymentIntent.customer as string
      );

      await this.createFailedPayment(localPaymentIntend, paymentIntent);
    } catch (error) {
      throw error;
    }
  }
  private async getUser(customerId: string) {
    try {
      const user = await this.userRepository.findByCustomerStripeId(customerId);
      if (!user) {
        throw new CustomException({
          message: `User with this customer stripe id: ${customerId} not found`,
          statusCode: 404,
          errorCode: StripeExceptionCodes.USER_NOT_FOUND,
          module: ModuleType.STRIPE_MODULE,
        });
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  private async getPaymentIntend(customerId: string): Promise<Payment> {
    try {
      const paymentIntend = await this.paymentRepository.findBySome(
        "customerStripeId",
        customerId
      );
      if (!paymentIntend) {
        throw new CustomException({
          message: `Payment intent with this customer stripe id: ${customerId} not found`,
          statusCode: 404,
          errorCode: StripeExceptionCodes.PAYMENT_INTENT_NOT_FOUND,
          module: ModuleType.STRIPE_MODULE,
        });
      }
      return paymentIntend;
    } catch (error) {
      throw error;
    }
  }
  private async createFailedPayment(localPaymentIntend: Payment, paymentIntent: Stripe.PaymentIntent) {
    try {
      await this.paymentRepository.createPayment({
        userId: localPaymentIntend.userId,
        planId: localPaymentIntend.planId,
        customerStripeId: localPaymentIntend.customerStripeId,
        amount: localPaymentIntend.amount,
        currency: localPaymentIntend.currency,
        status: PaymentStatus.FAILED,
        customerEmail: localPaymentIntend.customerEmail,
        errorMessage: paymentIntent.last_payment_error?.message,
      });
    } catch (error) {
      throw error;
    }
  }
}
