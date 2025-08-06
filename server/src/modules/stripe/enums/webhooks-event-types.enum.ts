export enum WebhooksEventTypes {
  CHECKOUT_SESSION_COMPLETED = "checkout.session.completed",
  CHECKOUT_SESSION_EXPIRED = "checkout.session.expired",
  CHECKOUT_SESSION_ASYNC_PAYMENT_SUCCEEDED = "checkout.session.async_payment_succeeded",
  CHECKOUT_SESSION_ASYNC_PAYMENT_FAILED = "checkout.session.async_payment_failed",
  INVOICE_PAYMENT_SUCCEEDED = "invoice.payment_succeeded",
  INVOICE_PAID = "invoice.paid",
  INVOICE_PAYMENT_FAILED = "invoice.payment_failed",
  
  PAYMENT_INTENT_PAYMENT_FAILED = "payment_intent.payment_failed",
  INVOICE_UPCOMING = "invoice.upcoming",
}
