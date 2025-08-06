import { Injectable } from "@nestjs/common";
import { SubscriptionRepository } from "../subscription.repository";
import { CustomException } from "src/common/exceptions/custom.exception";
import { SubscriptionExceptionCodes } from "../enums/subscriptionException.enum";
import { ModuleType } from "src/common/exceptions/enums";
import { SubscriptionStripeRepository } from "../../stripe/repositories/subscription-stripe-repository";
import { Subscription } from "src/modules/subscription/subscription.model";
import { SubscriptionStatus } from "../enums/subscription-status.enum";
import { UserRepository } from "../../user/user.repository";
import { SubscriptionData } from "../subscription.interface";

@Injectable()
export class CancelSubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly subscriptionStripeRepository: SubscriptionStripeRepository,
    private readonly userRepo: UserRepository
  ) {}
  async handle(subscriptionId: number) {
    try {
      const subscription = await this.getSubscription(subscriptionId);
      const cancelAt = await this.cancelSubscriptionInStripe(
        subscription.subscriptionStripeId
      );
      await this.updateSubscription(subscription.id, cancelAt);
    } catch (error) {
      throw error;
    }
  }
  private async getSubscription(
    subscriptionId: number
  ): Promise<SubscriptionData> {
    try {
      const subscription =
        await this.subscriptionRepository.findOneById(subscriptionId);
      if (!subscription) {
        throw new CustomException({
          message: `Subscription with this id: ${subscriptionId} not found`,
          statusCode: 400,
          errorCode: SubscriptionExceptionCodes.SUBSCRIPTION_NOT_FOUND,
          module: ModuleType.SUBSCRIPTION_MODULE,
        });
      }
      return subscription;
    } catch (error) {
      throw error;
    }
  }
  private async cancelSubscriptionInStripe(
    stripeSubscriptionId: string
  ): Promise<number> {
    try {
      const canceledSubscriptionOnStripe =
        await this.subscriptionStripeRepository.cancelSubscription(
          stripeSubscriptionId
        );
      if (!canceledSubscriptionOnStripe) {
        throw new CustomException({
          message: `Subscription with this id: ${stripeSubscriptionId} not found`,
          statusCode: 400,
          errorCode: SubscriptionExceptionCodes.SUBSCRIPTION_NOT_FOUND,
          module: ModuleType.SUBSCRIPTION_MODULE,
        });
      }
      return canceledSubscriptionOnStripe.cancel_at!;
    } catch (error) {
      throw error;
    }
  }
  private async updateSubscription(subscriptionDbId: number, cancelAt: number) {
    try {
      await this.subscriptionRepository.updateSubscription(subscriptionDbId, {
        status: SubscriptionStatus.CANCELED,
        updateAt: new Date(),
        endDate: new Date(cancelAt * 1000),
      });
    } catch (error) {
      throw error;
    }
  }
}
