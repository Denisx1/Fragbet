import { Injectable } from "@nestjs/common";
import { CustomException } from "src/common/exceptions/custom.exception";
import Stripe from "stripe";
import { StripeExceptionCodes } from "../enums/stripe-exceptions.enum";
import { ModuleType } from "src/common/exceptions/enums";
import { ActionEmailType } from "src/common/email/email.enums";
import { EmailService } from "src/common/email/email.service";
import { SubscriptionRepository } from "src/modules/subscription/subscription.repository";

@Injectable()
export class HandleInvoiceUpcoming {
  constructor(
    private readonly emailService: EmailService,
    private readonly subscriptionRepository: SubscriptionRepository
  ) {}

  async handle(invoice: Stripe.Invoice) {
    try {
      const { customer_email, next_payment_attempt } =
        this.validateMetadata(invoice);
      const cancelLink = await this.createCancelLink(invoice);
      await this.sendEmail(
        customer_email,
        ActionEmailType.UPCOMING_SUBSCRIPTION_PAYMENT_REMINDER,
        {
          nextPaymentAttempt: next_payment_attempt,
          amount: invoice.amount_due,
          currency: invoice.currency,
          cancelLink,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  private async createCancelLink(invoice: Stripe.Invoice): Promise<string> {
    // @Patch("cancel/:subscriptionId")
    const subscription = await this.subscriptionRepository.findBySomeId(
      "subscriptionStripeId",
      invoice.parent?.subscription_details?.subscription as string
    );
    if (!subscription) {
      throw new CustomException({
        message: "Subscription not found",
        statusCode: 404,
        errorCode: StripeExceptionCodes.SUBSCRIPTION_NOT_FOUND,
        module: ModuleType.STRIPE_MODULE,
      });
    }
    return `localhost:7095/subscription/cancel/${subscription.id}`;
  }
  private async sendEmail(
    customerEmail: string,
    actionEmailType: ActionEmailType,
    data: any
  ) {
    try {
      this.emailService.sendEmail(customerEmail, actionEmailType, data);
    } catch (error) {
      throw error;
    }
  }
  private validateMetadata(invoice: Stripe.Invoice): {
    customer_email: string;
    next_payment_attempt: Date;
  } {
    const { customer_email, next_payment_attempt } = invoice;
    if (!customer_email || !next_payment_attempt) {
      throw new CustomException({
        message: "Invoice not found",
        statusCode: 404,
        errorCode: StripeExceptionCodes.MISSING_METADATA,
        module: ModuleType.STRIPE_MODULE,
      });
    }
    return {
      customer_email,
      next_payment_attempt: new Date(next_payment_attempt * 1000),
    };
  }
}
