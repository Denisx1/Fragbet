import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AiPrediction } from "./prediction.model";
import { PredictionRepository } from "./prediction.repository";

@Module({
  imports: [SequelizeModule.forFeature([AiPrediction])],
  controllers: [],
  providers: [PredictionRepository],
  exports: [PredictionRepository],
})
export class PredictionModule {}
