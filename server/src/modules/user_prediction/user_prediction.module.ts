import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserPrediction } from "./user_prediction.modele";
import { UserPredictionController } from "./user_prediction.controller";
import { UserPredictionService } from "./user_prediction.service";
import { UserPredictionRepository } from "./user_prediction.repository";
import { PredictionModule } from "../prediction/prediction.module";
import { TokenModule } from "src/common/auth/token/token.module";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { CommonModule } from "src/common/common.module";

@Module({
  imports: [
    SequelizeModule.forFeature([UserPrediction]),
    PredictionModule,
    TokenModule,
    AuthModule,
    UserModule,
    CommonModule,
  ],
  controllers: [UserPredictionController],
  providers: [UserPredictionService, UserPredictionRepository],
})
export class UserPredictionModule {}
