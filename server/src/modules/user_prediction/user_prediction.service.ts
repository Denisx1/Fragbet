import { Injectable } from "@nestjs/common";
import { UserPredictionRepository } from "./user_prediction.repository";
import { PredictionRepository } from "../prediction/prediction.repository";
import { AiPrediction } from "../prediction/prediction.model";
import { CustomException } from "src/common/exceptions/custom.exception";
import { ModuleType } from "src/common/exceptions/enums";
import { ErrorCodes } from "./enums/exception.enums";
import { EmailService } from "src/common/email/email.service";
import { ActionEmailType } from "src/common/email/email.enums";

@Injectable()
export class UserPredictionService {
  constructor(
    private readonly userPredictionRepo: UserPredictionRepository,
    private readonly predictionRepo: PredictionRepository,
    private readonly emailService: EmailService
  ) {}
  async createPrediction(
    userId: number,
    matchId: number
  ): Promise<AiPrediction> {
    try {
      const [createdPrediction, receivedPrediction] = await Promise.all([
        this.userPredictionRepo.createPrediction({
          user_id: userId,
          match_id: matchId,
          ifFree: true,
          created_at: new Date(),
        }),
        this.predictionRepo.getPredictions(matchId),
      ]);

      if (!receivedPrediction) {
        throw new CustomException({
          message: `Prediction with this matchId ${matchId} not found`,
          statusCode: 400,
          errorCode: ErrorCodes.PREDICTION_NOT_FOUND,
          module: ModuleType.USER_PREDICTION_MODULE,
        });
      }
      this.emailService.sendEmail(
        createdPrediction.dataValues.user.email,
        ActionEmailType.GOT_A_ONE_OFF_MATCH,
        {
          name: createdPrediction.dataValues.user.email,
          match_slug: receivedPrediction.dataValues.match_slug,
          prediction: JSON.stringify(receivedPrediction.dataValues),
        }
      );
      return receivedPrediction;
    } catch (error) {
      throw error;
    }
  }
}
