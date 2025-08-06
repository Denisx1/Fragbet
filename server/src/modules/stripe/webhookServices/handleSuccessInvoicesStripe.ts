import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { CustomException } from "src/common/exceptions/custom.exception";
import { StripeExceptionCodes } from "../enums/stripe-exceptions.enum";
import { ModuleType } from "src/common/exceptions/enums";

import { SubscriptionRepository } from "../../subscription/subscription.repository";
import { SubscriptionStatus } from "src/modules/subscription/enums/subscription-status.enum";
import { PaymentRepository } from "src/modules/payment/payment.repository";
import { PaymentStatus } from "src/enums/payment-status.enum";
import { UserRepository } from "src/modules/user/user.repository";
import { EmailService } from "src/common/email/email.service";

import { Payment } from "src/modules/payment/payment.model";

import { ActionEmailType } from "src/common/email/email.enums";
import { Subscription } from "src/modules/subscription/subscription.model";
import { InvoiceRepository } from "src/modules/invoice/invoice.repository";
import { Invoice } from "src/modules/invoice/invoice.model";
import { addSubscriptionPeriod } from "../utils/addDinamicData";

@Injectable()
export class HandleSuccessInvoices {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService
  ) {}
  async handle(invoice: Stripe.Invoice): Promise<void> {
    try {
      const subscription = await this.getSubscription(invoice);
      const isFirstPayment = !subscription.dataValues.payments.some(
        (payment: Payment) =>
          payment.dataValues.status === PaymentStatus.SUCCESS
      );
      if (isFirstPayment) {
        await this.processFirstPayment(invoice, subscription);
        return;
      }

      await this.processRegularPayment(invoice, subscription);
    } catch (error) {
      throw error;
    }
  }
  private async processRegularPayment(
    invoice: Stripe.Invoice,
    subscription: Subscription
  ) {
    try {
      const currentEndDate = subscription.dataValues.endDate;
      const startDateForNewPeriod =
        currentEndDate && currentEndDate > new Date()
          ? currentEndDate
          : new Date();
      const newEndDate = addSubscriptionPeriod(
        startDateForNewPeriod,
        subscription.dataValues.plan.dataValues.interval
      );
      const regularPayment = await this.createRegularPayment(
        invoice,
        subscription.id
      );

      const [invoiceRecord, newSubscription, newUser] = await Promise.all([
        this.createInvoice(invoice, regularPayment.id),
        this.subscriptionRepository.updateSubscription(subscription.id, {
          subscriptionStripeId: subscription.subscriptionStripeId,
          startDate: startDateForNewPeriod,
          endDate: newEndDate,
          updateAt: new Date(),
          status: SubscriptionStatus.ACTIVE,
        }),
        this.userRepository.update(+subscription.userId, {
          isSubscribed: true,
          activeSubscriptionId: subscription.id,
        }),
      ]);
      this.sendEmail(newUser.email, ActionEmailType.SUBSCRIPTION_RENEWED, {
        startDate: newSubscription.startDate.toDateString(),
        endDate: newSubscription.endDate.toDateString(),
        planName: subscription.dataValues.plan.dataValues.name,
        price: `${subscription.dataValues.plan.dataValues.price} ${subscription.dataValues.plan.dataValues.currency}`,
        invoicePdfUrl: invoiceRecord.invoicePDFUrl,
        hostedInvoiceUrl: invoiceRecord.hostedInvoiceUrl,
      });
    } catch (error) {
      throw error;
    }
  }
  private async processFirstPayment(
    invoice: Stripe.Invoice,
    subscription: Subscription
  ) {
    try {
      const payment = await this.updatePayment(
        invoice,
        subscription.id,
        subscription.dataValues.user.dataValues.email
      );
      const newEndDate = addSubscriptionPeriod(
        new Date(),
        subscription.dataValues.plan.dataValues.interval
      );
      const [newInvoice, newSubscription, newUser] = await Promise.all([
        this.createInvoice(invoice, payment.id),
        this.subscriptionRepository.updateSubscription(subscription.id, {
          subscriptionStripeId: subscription.subscriptionStripeId,
          startDate: new Date(),
          endDate: newEndDate,
          updateAt: new Date(),
          status: SubscriptionStatus.ACTIVE,
        }),
        this.userRepository.update(+subscription.userId, {
          isSubscribed: true,
          activeSubscriptionId: subscription.id,
        }),
      ]);
      this.sendEmail(newUser.email, ActionEmailType.SUBSCRIPTION_COMPLETED, {
        startDate: newSubscription.startDate.toDateString(),
        endDate: newSubscription.endDate.toDateString(),
        planName: subscription.dataValues.plan.dataValues.name,
        firstPaymentDay: new Date().toDateString(),
        price: `${subscription.dataValues.plan.dataValues.price} ${subscription.dataValues.plan.dataValues.currency}`,
        invoicePdfUrl: newInvoice.invoicePDFUrl,
        hostedInvoiceUrl: newInvoice.hostedInvoiceUrl,
      });
    } catch (error) {
      throw error;
    }
  }
  private async getSubscription(
    invoice: Stripe.Invoice
  ): Promise<Subscription> {
    try {
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
      return subscription;
    } catch (error) {
      throw error;
    }
  }
  private async updatePayment(
    invoice: Stripe.Invoice,
    subscriptionId: number,
    userEmail: string
  ): Promise<Payment> {
    try {
      const { planId, userId, paymentId } =
        invoice.parent?.subscription_details?.metadata!;

      if (!planId || !userId || !paymentId) {
        throw new CustomException({
          message: "Missing metadata",
          statusCode: 400,
          errorCode: StripeExceptionCodes.MISSING_METADATA,
          module: ModuleType.STRIPE_MODULE,
        });
      }
      const draftPayment = await this.paymentRepository.findBySome(
        "id",
        +paymentId
      );
      if (!draftPayment) {
        throw new CustomException({
          message: "Payment not found",
          statusCode: 404,
          errorCode: StripeExceptionCodes.PAYMENT_NOT_FOUND,
          module: ModuleType.STRIPE_MODULE,
        });
      }
      await this.paymentRepository.updatePayment(+paymentId, {
        status: PaymentStatus.SUCCESS,
        invoiceStripeId: invoice.id,
        subscriptionId,
        customerEmail: userEmail,
      });
      await this.paymentRepository.updateOtherPaymentsSubscriptionId(
        +userId,
        +planId,
        +paymentId,
        subscriptionId
      );
      return draftPayment;
    } catch (error) {
      throw error;
    }
  }
  private async createInvoice(
    invoice: Stripe.Invoice,
    paymentId: number
  ): Promise<Invoice> {
    try {
      return await this.invoiceRepository.createInvoice({
        stripeInvoiceId: invoice.id!,
        paymentId,
        status: invoice.status!,
        date: invoice.period_end,
        amountDue: invoice.amount_due,
        amountPaid: invoice.amount_paid,
        invoicePDFUrl: invoice.invoice_pdf!,
        hostedInvoiceUrl: invoice.hosted_invoice_url!,
      });
    } catch (error) {
      throw error;
    }
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
  private async createRegularPayment(
    invoice: Stripe.Invoice,
    subscriptionId: number
  ): Promise<Payment> {
    try {
      const { planId, userId } =
        invoice.parent?.subscription_details?.metadata!;
      if (!planId || !userId) {
        throw new CustomException({
          message: "Missing metadata",
          statusCode: 400,
          errorCode: StripeExceptionCodes.MISSING_METADATA,
          module: ModuleType.STRIPE_MODULE,
        });
      }
      return await this.paymentRepository.createPayment({
        userId: +userId,
        planId: +planId,
        customerStripeId: invoice.customer as string,
        amount: invoice.amount_due,
        currency: invoice.currency,
        status: PaymentStatus.SUCCESS,
        invoiceStripeId: invoice.id,
        subscriptionId,
        customerEmail: invoice.customer_email!,
      });
    } catch (error) {
      throw error;
    }
  }
}
