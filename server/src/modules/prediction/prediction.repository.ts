import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AiPrediction } from "./prediction.model";

@Injectable()
export class PredictionRepository {
  constructor(
    @InjectModel(AiPrediction) private predictionModel: typeof AiPrediction
  ) {}
  async getPredictions(matchId: number): Promise<AiPrediction | null> {
    return this.predictionModel.findOne({
      where: {
        match_id: matchId,
      },
    });
  }
}
