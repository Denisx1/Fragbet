import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { SubscriptionData } from "./subscription.interface";
import { AuthGuard } from "../auth/guards/auth.guard";
import { EmailVerifyGuard } from "src/common/email/guards/email.verify.guard";
import { MinRoleGuard } from "../roles/guards/minRole.guard";
import { Roles } from "../roles/decorators/role.decorator";
import { RolesEnum } from "src/enums/roles.enum";
import { ICustomRequest } from "../auth/auth.interfaces";

import { BuySubscriptionService } from "./services/buySubscriptionService";

@UseGuards(AuthGuard, EmailVerifyGuard, MinRoleGuard)
@Controller("subscription")
export class SubscriptionController {
  constructor(
    private readonly buySubscriptionService: BuySubscriptionService
  ) {}

  @Roles(RolesEnum.USER)
  @Post("subscribe/:planId")
  async buySubscription(
    @Param("planId", ParseIntPipe)
    planId: number,
    @Req() req: ICustomRequest
  ): Promise<string> {
    const checkoutUrl = await this.buySubscriptionService.handleSubscribe(
      planId,
      req.authedUser.id
    );
    return checkoutUrl;
  }
  // @Roles(RolesEnum.USER)
  // @Patch("cancel/:subscriptionId")
  // async cancelSubscription(
  //   @Param("subscriptionId", ParseIntPipe) subscriptionId: number
  // ): Promise<string> {
  //   const result =
  //     await this.subscriptionService.cancelSubscription(subscriptionId);
  //   return result.message;
  // }
  // @Roles(RolesEnum.ADMIN)
  // @Get(":userId")
  // async getSubscriptionByUserId(
  //   @Param("userId", ParseIntPipe) userId: number
  // ): Promise<SubscriptionData> {
  //   const subscription =
  //     await this.subscriptionService.getSubscriptionByUserId(userId);
  //   return subscription;
  // }
}
