import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModule } from "./modules/user/user.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./modules/user/user.model";
import { CommonModule } from "./common/common.module";
import { ActionToken } from "./common/action-token/action-token.model";
import { AuthModule } from "./modules/auth/auth.module";
import { Auth } from "./modules/auth/auth.model";
import { RequestLoggerMiddleware } from "./common/middleware/request-logger.middleware";
import { Role } from "./modules/roles/roles.model";
import { UserRoles } from "./modules/roles/user-roles.model";
import { RolesModule } from "./modules/roles/roles.module";
import { Subscription } from "./modules/subscription/subscription.model";
import { Payment } from "./modules/payment/payment.model";
import { GetIpMiddleware } from "./common/middleware/getIpMiddleware";
import { Product } from "./modules/product/product.modele";
import { ProductPlan } from "./modules/plan/plan-model";
import { PlanModule } from "./modules/plan/plan.module";
import { DraftPlan } from "./modules/draft-plan/draft-plan-model";
import { StripeModule } from "./modules/stripe/stripe.module";
import { ProductModule } from "./modules/product/product.module";
import { DraftPlanModule } from "./modules/draft-plan/draft-plan.module";
import { SubscriptionModule } from "./modules/subscription/subscription.module";
import { PaymentModule } from "./modules/payment/payment.module";
import { ScheduleModule } from "@nestjs/schedule";
import { Invoice } from "./modules/invoice/invoice.model";

import { Tier } from "./modules/tier/models/tier.model";

import { Game } from "./modules/tier/models/game.model";

import { Code } from "./modules/tier/models/code.model";
import { TierModule } from "./modules/tier/tier.module";
import { UserPredictionModule } from "./modules/user_prediction/user_prediction.module";
import { UserPrediction } from "./modules/user_prediction/user_prediction.modele";
import { AiPrediction } from "./modules/prediction/prediction.model";
import { Team } from "./modules/team/team.model";
import { TeamStats } from "./modules/team-stat/teamStatModel";
import { Country } from "./modules/team/optionalModels/countryModel";
import { Region } from "./modules/team/optionalModels/regionModel";
import { Player } from "./modules/player/playerModel";

import { TeamModule } from "./modules/team/team.module";
import { PlayerModule } from "./modules/player/player.module";
import { UpcomingMatchModule } from "./modules/upcoming-match/upcoming-match.module";
import { Match } from "./modules/upcoming-match/upcomingMatchModel";

@Module({
  imports: [
    ScheduleModule.forRoot({}),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [
        User,
        ActionToken,
        Auth,
        Role,
        UserRoles,
        Subscription,
        Payment,
        Product,
        ProductPlan,
        DraftPlan,
        Invoice,
        Match,
        Game,
        AiPrediction,
        Tier,
        Team,
        TeamStats,
        Code,
        Country,
        Player,
        Region,
        UserPrediction,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    CommonModule,
    AuthModule,
    RolesModule,
    StripeModule,
    ProductModule,
    PlanModule,
    DraftPlanModule,
    SubscriptionModule,
    PaymentModule,
    TierModule,
    UserPredictionModule,
    TeamModule,
    PlayerModule,
    UpcomingMatchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes(
        { path: "auth/login", method: RequestMethod.POST },
        { path: "auth/register", method: RequestMethod.POST },
        { path: "auth/refresh", method: RequestMethod.POST }
      );

    consumer.apply(GetIpMiddleware).forRoutes("subscription/buy/:id");
  }
}
