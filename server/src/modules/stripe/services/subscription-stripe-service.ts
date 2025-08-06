import { Injectable } from "@nestjs/common";
import { SubscriptionStripeRepository } from "../repositories/subscription-stripe-repository";
import { CustomException } from "src/common/exceptions/custom.exception";
import { StripeExceptionCodes } from "../enums/stripe-exceptions.enum";
import { ModuleType } from "src/common/exceptions/enums";

@Injectable()
export class SubscriptionStripeService {
  constructor(
    private readonly subscriptionStripeRepository: SubscriptionStripeRepository
  ) {}
  async subscriptionUpdate(
    subscriptionStripeId: string,
    arg1: { cancel_at_period_end: boolean }
  ) {
    const subscription =
      await this.subscriptionStripeRepository.subscriptionUpdate(
        subscriptionStripeId,
        arg1
      );
    if (!subscription) {
      throw new CustomException({
        message: `Subscription with this id: ${subscriptionStripeId} not found`,
        statusCode: 400,
        errorCode: StripeExceptionCodes.SUBSCRIPTION_NOT_FOUND,
        module: ModuleType.STRIPE_MODULE,
      });
    }
    return subscription;
  }
}
