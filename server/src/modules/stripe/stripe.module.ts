import { Module } from "@nestjs/common";
import { StripeController } from "./stripe.controller";
import { PriceStripeService } from "./services/price-stripe-service";
import { ProductStripeService } from "./services/product-stripe-service";
import { SessionStripeService } from "./services/session-stripe-service";
import { PriceStripeRepository } from "./repositories/price-stripe-repositoruy";
import { ProductStripeRepository } from "./repositories/product-stripe-repository";
import { SessionStripeRepository } from "./repositories/session-stripe-repository";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config";
import { createStripeClient } from "./config/stripe.config";
import Stripe from "stripe";
import { StripeService } from "./stripe.service";
import { PaymentModule } from "../payment/payment.module";
import { forwardRef } from "@nestjs/common";
import { SubscriptionModule } from "../subscription/subscription.module";
import { UserModule } from "../user/user.module";
import { CommonModule } from "src/common/common.module";
import { PlanModule } from "../plan/plan.module";
import { SubscriptionStripeRepository } from "./repositories/subscription-stripe-repository";
import { InvoiceStripeRepository } from "./repositories/invoice-stripe-repository";
import { ChargeStripeRepository } from "./repositories/charge-stripe-repository";

import { SubscriptionStripeService } from "./services/subscription-stripe-service";
import { HandleCompleteCheckoutSession } from "./webhookServices/handleCompleteCheckoutSession";
import { CustomerStripeRepository } from "./repositories/customer-stripe-repository";
import { HandleExpiredCheckoutSession } from "./webhookServices/handleExpiredCheckoutSession";
import { HandleSuccessInvoices } from "./webhookServices/handleSuccessInvoicesStripe";
import { HandleFailedInvoices } from "./webhookServices/handleFailedInvoices";
import { InvoiceModule } from "../invoice/invoice.module";
import { HandlePaymentIntentPaymentFailed } from "./webhookServices/handlePaymentIntent.PaymentFailed";
import { HandleInvoiceUpcoming } from "./webhookServices/handleInvoiceUpcoming";

@Module({
  imports: [
    InvoiceModule,
    ConfigModule,
    forwardRef(() => PaymentModule),
    forwardRef(() => SubscriptionModule),
    UserModule,
    CommonModule,
    PlanModule,
  ],
  controllers: [StripeController],
  providers: [
    {
      provide: Stripe,
      useFactory: createStripeClient,
      inject: [ConfigService],
    },
    PriceStripeService,
    ProductStripeService,
    SessionStripeService,
    PriceStripeRepository,
    ProductStripeRepository,
    SessionStripeRepository,
    StripeService,
    SubscriptionStripeRepository,
    InvoiceStripeRepository,
    ChargeStripeRepository,
    SubscriptionStripeRepository,
    SessionStripeService,
    SubscriptionStripeService,
    HandleCompleteCheckoutSession,
    CustomerStripeRepository,
    HandleExpiredCheckoutSession,
    HandleSuccessInvoices,
    HandleFailedInvoices,
    HandlePaymentIntentPaymentFailed,
    HandleInvoiceUpcoming
  ],
  exports: [
    PriceStripeService,
    ProductStripeService,
    SessionStripeService,
    PriceStripeRepository,
    ProductStripeRepository,
    SessionStripeRepository,
    SubscriptionStripeRepository,
    SubscriptionStripeService,
    CustomerStripeRepository,
  ],
})
export class StripeModule {}
