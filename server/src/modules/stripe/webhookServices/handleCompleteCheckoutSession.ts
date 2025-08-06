import { Injectable } from "@nestjs/common";
import { SubscriptionRepository } from "src/modules/subscription/subscription.repository";
import Stripe from "stripe";
import { CustomException } from "src/common/exceptions/custom.exception";
import { StripeExceptionCodes } from "../enums/stripe-exceptions.enum";
import { ModuleType } from "src/common/exceptions/enums";

import { SubscriptionStatus } from "src/modules/subscription/enums/subscription-status.enum";

import { PlanInterval } from "src/modules/plan/enums/plan-interval.enam";
import { SubscriptionData } from "src/modules/subscription/subscription.interface";

@Injectable()
export class HandleCompleteCheckoutSession {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository
  ) {}
  async handle(session: Stripe.Checkout.Session) {
    const { userId, planId, interval } = this.validateSessionMetadata(session);

    await this.processSubscription(session, { userId, planId, interval });
  }

  private validateSessionMetadata(session: Stripe.Checkout.Session) {
    const { userId, planId, interval } = session.metadata || {};
    if (!userId || !planId || !interval) {
      throw new CustomException({
        message: "Invalid session metadata",
        statusCode: 400,
        errorCode: StripeExceptionCodes.INVALID_SESSION_METADATA,
        module: ModuleType.STRIPE_MODULE,
      });
    }

    return {
      userId: +userId,
      planId: +planId,
      interval: interval as PlanInterval,
    };
  }

  private async processSubscription(
    session: Stripe.Checkout.Session,
    metadata: {
      userId: number;
      planId: number;
      interval: PlanInterval;
    }
  ): Promise<SubscriptionData> {
    const existing = await this.getExistingSubscription(
      metadata.planId,
      metadata.userId
    );

    if (
      existing &&
      (existing.status === SubscriptionStatus.EXPIRED ||
        existing.status === SubscriptionStatus.CANCELED)
    ) {
      return this.updateExistingSubscription(existing.id, session);
    }

    return this.createNewSubscription(metadata, session);
  }

  private async getExistingSubscription(planId: number, userId: number) {
    return this.subscriptionRepository.findByPlanId(planId, userId);
  }

  private async createNewSubscription(
    metadata: { userId: number; planId: number },
    session: Stripe.Checkout.Session
  ) {
    return this.subscriptionRepository.createSubscription({
      userId: metadata.userId,
      planId: metadata.planId,
      status: SubscriptionStatus.INITIALIZED,
      subscriptionStripeId: session.subscription!.toString(),
    });
  }

  private async updateExistingSubscription(
    subscriptionId: number,
    session: Stripe.Checkout.Session
  ) {
    return this.subscriptionRepository.updateSubscription(subscriptionId, {
      status: SubscriptionStatus.INITIALIZED,
      subscriptionStripeId: session.subscription!.toString(),
      updateAt: new Date(),
    });
  }
}
