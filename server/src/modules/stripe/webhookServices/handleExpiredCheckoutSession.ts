import { Injectable } from "@nestjs/common";
import { CustomException } from "src/common/exceptions/custom.exception";
import Stripe from "stripe";
import { StripeExceptionCodes } from "../enums/stripe-exceptions.enum";
import { ModuleType } from "src/common/exceptions/enums";
import { PaymentStatus } from "src/enums/payment-status.enum";
import { PaymentRepository } from "src/modules/payment/payment.repository";
import { SessionStripeRepository } from "../repositories/session-stripe-repository";
import { PlanInterval } from "src/modules/plan/enums/plan-interval.enam";
import { PlanRepository } from "src/modules/plan/plan-repository";
import { EmailService } from "src/common/email/email.service";
import { ActionEmailType } from "src/common/email/email.enums";

@Injectable()
export class HandleExpiredCheckoutSession {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly sessionStripeRepository: SessionStripeRepository,
    private readonly planRepo: PlanRepository,
    private readonly emailService: EmailService
  ) {}
  async handle(session: Stripe.Checkout.Session) {
    try {
      const { paymentId, userId, planId, interval } = session.metadata || {};
      if (!paymentId || !userId || !planId || !interval) {
        throw new CustomException({
          message: "Invalid session metadata",
          statusCode: 400,
          errorCode: StripeExceptionCodes.INVALID_SESSION_METADATA,
          module: ModuleType.STRIPE_MODULE,
        });
      }

      const payment = await this.paymentRepository.findByPaymentId(+paymentId);
      if (!payment) {
        throw new CustomException({
          message: `Payment with this id: ${paymentId} not found`,
          statusCode: 400,
          errorCode: StripeExceptionCodes.PAYMENT_NOT_FOUND,
          module: ModuleType.STRIPE_MODULE,
        });
      }

      if (payment.status === PaymentStatus.SUCCESS) {
        throw new CustomException({
          message: `Payment with this id: ${paymentId} already success`,
          statusCode: 400,
          errorCode: StripeExceptionCodes.PAYMENT_ALREADY_SUCCESS,
          module: ModuleType.STRIPE_MODULE,
        });
      }
      await this.paymentRepository.updatePayment(+paymentId, {
        status: PaymentStatus.EXPIRED,
      });
      const plan = await this.planRepo.findById(+planId);
      if (!plan) {
        throw new CustomException({
          message: `Plan with this id: ${planId} not found`,
          statusCode: 400,
          errorCode: StripeExceptionCodes.PLAN_NOT_FOUND,
          module: ModuleType.STRIPE_MODULE,
        });
      }
      // const newSession =
      //   await this.sessionStripeRepository.createCheckoutSession({
      //     userId: +userId,
      //     planId: +planId,
      //     interval: interval as PlanInterval,
      //     priceStripeId: plan.stripePriceId!,
      //   });

      this.emailService.sendEmail(
        session.customer_email!,
        ActionEmailType.SESSION_EXPIRED,
        {
          frontendUrl: process.env.FRONTEND_URL!,
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
