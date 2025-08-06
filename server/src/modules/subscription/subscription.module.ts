import { forwardRef, Module } from "@nestjs/common";

import { SequelizeModule } from "@nestjs/sequelize";
import { Subscription } from "./subscription.model";
import { SubscriptionRepository } from "./subscription.repository";
import { TokenModule } from "src/common/auth/token/token.module";
import { AuthModule } from "src/modules/auth/auth.module";
import { UserModule } from "src/modules/user/user.module";
import { PaymentModule } from "../payment/payment.module";

import { PlanModule } from "../plan/plan.module";
import { SubscriptionController } from "./subscription.controller";

import { StripeModule } from "../stripe/stripe.module";
import { SubscriptionCronService } from "./cron/subscriptionCronService";
import { CommonModule } from "src/common/common.module";
import { BuySubscriptionService } from "./services/buySubscriptionService";
import { CancelSubscriptionService } from "./services/cancelSubscriptionService";
@Module({
  imports: [
    SequelizeModule.forFeature([Subscription]),
    TokenModule,
    forwardRef(() => AuthModule),
    UserModule,
    forwardRef(() => PaymentModule),
    PlanModule,
    forwardRef(() => StripeModule),
    CommonModule,
  ],
  providers: [
    SubscriptionRepository,
    SubscriptionCronService,
    BuySubscriptionService,
    CancelSubscriptionService,
  ],
  controllers: [SubscriptionController],
  exports: [SubscriptionRepository],
})
export class SubscriptionModule {}
