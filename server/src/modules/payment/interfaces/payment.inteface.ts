import { PaymentStatus } from "src/enums/payment-status.enum";

export interface PaymentCreationAttrs {
  userId: number;
  planId: number;
  customerStripeId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  subscriptionId?: number;
  invoiceStripeId?: string;
  customerEmail?: string;
  errorMessage?: string;
}

export interface PaymentUpdateAttrs {
  status?: PaymentStatus;
  subscriptionId?: number;
  customerEmail?: string;
  invoiceId?: number;
  invoiceStripeId?: string;
  chargeId?: string;
  errorMessage?: string;
  planId?: number;
}
