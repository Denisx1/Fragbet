import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Payment } from "./payment.model";

import { PaymentService } from "./payment.service";
import { PaymentRepository } from "./payment.repository";

import { UserModule } from "../user/user.module";
import { CommonModule } from "src/common/common.module";
import { StripeModule } from "../stripe/stripe.module";
import { SubscriptionModule } from "../subscription/subscription.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Payment]),
    forwardRef(() => SubscriptionModule),
    forwardRef(() => StripeModule),
    UserModule,
    CommonModule,
  ],
  controllers: [],
  providers: [PaymentService, PaymentRepository],
  exports: [PaymentRepository, PaymentService],
})
export class PaymentModule {}
