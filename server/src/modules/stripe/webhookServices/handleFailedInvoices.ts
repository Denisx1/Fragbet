import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { SubscriptionRepository } from "../../subscription/subscription.repository";
import { CustomException } from "src/common/exceptions/custom.exception";
import { StripeExceptionCodes } from "../enums/stripe-exceptions.enum";
import { ModuleType } from "src/common/exceptions/enums";
import { Subscription } from "src/modules/subscription/subscription.model";
import { Payment } from "src/modules/payment/payment.model";
import { PaymentStatus } from "src/enums/payment-status.enum";
import { PaymentRepository } from "src/modules/payment/payment.repository";
import { EmailService } from "src/common/email/email.service";
import { ActionEmailType } from "src/common/email/email.enums";
import { SubscriptionStatus } from "src/modules/subscription/enums/subscription-status.enum";
import { UserRepository } from "src/modules/user/user.repository";

@Injectable()
export class HandleFailedInvoices {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly emailService: EmailService,
    private readonly userRepository: UserRepository
  ) {}
  async handle(invoice: Stripe.Invoice): Promise<void> {
    try {
      const subscription = await this.getSubscription(invoice);
      await this.updateSubscription(subscription);
      await this.userRepository.update(subscription.dataValues.userId, {
        isSubscribed: false,
        activeSubscriptionId: null,
      });
      this.emailService.sendEmail(
        subscription.dataValues.user.dataValues.email,
        ActionEmailType.PAYMENT_FAILED,
        {
          planName: subscription.dataValues.plan.dataValues.name,
          price: `${subscription.dataValues.plan.dataValues.price} ${subscription.dataValues.plan.dataValues.currency}`,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  private async getSubscription(
    invoice: Stripe.Invoice
  ): Promise<Subscription> {
    try {
      const subscriptionStripeId = invoice.lines.data[0].parent
        ?.subscription_item_details?.subscription as string;

      const subscription = await this.subscriptionRepository.findBySomeId(
        "subscriptionStripeId",
        subscriptionStripeId
      );
      if (!subscription) {
        throw new CustomException({
          message: "Local subscription not found",
          statusCode: 404,
          errorCode: StripeExceptionCodes.SUBSCRIPTION_NOT_FOUND,
          module: ModuleType.STRIPE_MODULE,
        });
      }
      return subscription;
    } catch (error) {
      throw error;
    }
  }
  private async updateSubscription(subscription: Subscription): Promise<void> {
    try {
      await this.subscriptionRepository.updateSubscription(subscription.id, {
        status: SubscriptionStatus.EXPIRED,
        updateAt: new Date(),
      });
    } catch (error) {
      throw error;
    }
  }
}
