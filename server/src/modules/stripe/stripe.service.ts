import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { WebhooksEventTypes } from "./enums/webhooks-event-types.enum";

import { HandleCompleteCheckoutSession } from "./webhookServices/handleCompleteCheckoutSession";
import { HandleExpiredCheckoutSession } from "./webhookServices/handleExpiredCheckoutSession";
import { HandleSuccessInvoices } from "./webhookServices/handleSuccessInvoicesStripe";
import { HandleFailedInvoices } from "./webhookServices/handleFailedInvoices";
import { HandlePaymentIntentPaymentFailed } from './webhookServices/handlePaymentIntent.PaymentFailed';

@Injectable()
export class StripeService {
  constructor(
    private readonly stripe: Stripe,

    private readonly handleCompleteCheckoutSession: HandleCompleteCheckoutSession,
    private readonly handleExpiredCheckoutSession: HandleExpiredCheckoutSession,
    private readonly handleSuccessInvoices: HandleSuccessInvoices,
    private readonly handleFailedInvoices: HandleFailedInvoices,
    private readonly handlePaymentIntentPaymentFailed: HandlePaymentIntentPaymentFailed
  ) {}
  async verifyWebhook(
    body: Buffer,
    sig: string | string[]
  ): Promise<Stripe.Event> {
    try {
      const event = await this.stripe.webhooks.constructEventAsync(
        body,
        sig,
        process.env.WEBHOOK_SECRET!
      );

      return event;
    } catch (error) {
      throw error;
    }
  }
  async handleWebhookEvent(event: Stripe.Event): Promise<void> {
    try {
      switch (event.type) {
        case WebhooksEventTypes.CHECKOUT_SESSION_COMPLETED:
          const successSession = event.data.object as Stripe.Checkout.Session;
          await this.handleCompleteCheckoutSession.handle(successSession);

          break;
        case WebhooksEventTypes.CHECKOUT_SESSION_EXPIRED:
          const expiredSession = event.data.object as Stripe.Checkout.Session;
          await this.handleExpiredCheckoutSession.handle(expiredSession);
          break;

        case WebhooksEventTypes.INVOICE_PAID:
          const successInvoice = event.data.object as Stripe.Invoice;
          
          await this.handleSuccessInvoices.handle(successInvoice);
          break;
        case WebhooksEventTypes.INVOICE_PAYMENT_FAILED:
          const failedInvoice = event.data.object as Stripe.Invoice;
        
          await this.handleFailedInvoices.handle(failedInvoice);
          break;
        case WebhooksEventTypes.PAYMENT_INTENT_PAYMENT_FAILED:
          const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
          
          await this.handlePaymentIntentPaymentFailed.handle(failedPaymentIntent);
          break;
          case WebhooksEventTypes.INVOICE_UPCOMING:
          const upcomingInvoice = event.data.object as Stripe.Invoice;
          
          await this.handleSuccessInvoices.handle(upcomingInvoice);
          break;
          
      }
    } catch (error) {
      throw error;
    }
  }
}
