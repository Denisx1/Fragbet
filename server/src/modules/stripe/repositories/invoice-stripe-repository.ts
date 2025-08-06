import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class InvoiceStripeRepository {
  constructor(private readonly stripe: Stripe) {}

  async retrieveInvoice(invoiceId: string) {
    return this.stripe.invoices.retrieve(invoiceId, {
      expand: ["payment_intent"],
    });
  }
  async getList(stripePaymentIntendId: string) {
    const list = await this.stripe.invoices.list({
      customer: stripePaymentIntendId,
    
    });
    return list;
  }
}
