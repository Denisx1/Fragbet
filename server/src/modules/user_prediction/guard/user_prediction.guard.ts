import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserPredictionRepository } from "../user_prediction.repository";
import { ModuleType } from "src/common/exceptions/enums";
import { ErrorCodes } from "../enums/exception.enums";
import { CustomException } from "src/common/exceptions/custom.exception";

@Injectable()
export class UserPredictionGuard implements CanActivate {
  constructor(private userPredictionRepository: UserPredictionRepository) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authedUser = request.authedUser;
    const userId = authedUser.id;
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const predictionCount =
      await this.userPredictionRepository.countPredictions(userId, since);
    if (predictionCount >= 1) {
      throw new CustomException({
        message: "User already made a prediction",
        statusCode: 403,
        module: ModuleType.USER_PREDICTION_MODULE,
        errorCode: ErrorCodes.USER_ALREADY_GOT_A_PREDICTION,
      });
    }
    return true;
  }
}
