import { Module } from "@nestjs/common";
import { DraftPlanController } from "./draft-plan.controller";
import { DraftPlanService } from "./draft-plan.service";
import { DraftPlanRepository } from "./draft-plan-repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { DraftPlan } from "./draft-plan-model";
import { ProductModule } from "../product/product.module";
import { TokenModule } from "src/common/auth/token/token.module";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { PlanModule } from "../plan/plan.module";

import { EmailModule } from "src/common/email/email.module";
import { StripeModule } from "../stripe/stripe.module";

@Module({
  imports: [
    SequelizeModule.forFeature([DraftPlan]),
    ProductModule,
    TokenModule,
    AuthModule,
    UserModule,
    PlanModule,
    StripeModule,
    EmailModule,
    UserModule,
  ],
  providers: [DraftPlanService, DraftPlanRepository],
  controllers: [DraftPlanController],
})
export class DraftPlanModule {}
