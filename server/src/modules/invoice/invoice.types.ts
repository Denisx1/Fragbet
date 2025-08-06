export interface InvoiceCreationAttrs {
  stripeInvoiceId: string;
  paymentId: number;
  status?: string;
  date?: number;
  amountDue?: number;
  amountPaid?: number;
  invoicePDFUrl?: string;
  hostedInvoiceUrl?: string;
}

export interface InvoiceUpdateAttrs {
  status: string;
  date: number;
  amountDue: number;
  amountPaid: number;
  invoicePDFUrl: string;
  hostedInvoiceUrl: string;
}
