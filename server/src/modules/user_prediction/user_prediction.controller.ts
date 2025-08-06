import { Controller, Get, Param, ParseIntPipe, Post, Req } from "@nestjs/common";
import { UserPredictionService } from "./user_prediction.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/guards/auth.guard";
import { ICustomRequest } from "../auth/auth.interfaces";
import { EmailVerifyGuard } from "src/common/email/guards/email.verify.guard";
import { UserPredictionGuard } from "./guard/user_prediction.guard";

@Controller("user-prediction")
export class UserPredictionController {
  constructor(private userPredictionService: UserPredictionService) {}

  @UseGuards(AuthGuard, EmailVerifyGuard, UserPredictionGuard)
  @Post("create-prediction/:matchId")
  async createPrediction(
    @Req() req: ICustomRequest,
    @Param("matchId", ParseIntPipe) matchId: number
  ): Promise<any> {
    return this.userPredictionService.createPrediction(req.authedUser.id, matchId);
  }
}
