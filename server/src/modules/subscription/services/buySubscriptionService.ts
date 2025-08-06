import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../user/user.repository";
import { CustomException } from "src/common/exceptions/custom.exception";
import { SubscriptionExceptionCodes } from "../enums/subscriptionException.enum";
import { ModuleType } from "src/common/exceptions/enums";
import { PlanRepository } from "../../plan/plan-repository";
import { ProductPlan } from "../../plan/plan-model";
import { SessionStripeRepository } from "../../stripe/repositories/session-stripe-repository";
import { SubscriptionRepository } from "../subscription.repository";
import { SubscriptionData } from "../subscription.interface";
import { SubscriptionStatus } from "../enums/subscription-status.enum";
import { SubscriptionStripeRepository } from "../../stripe/repositories/subscription-stripe-repository";
import { SubscriptionStripeService } from "../../stripe/services/subscription-stripe-service";
import { StripeExceptionCodes } from "../../stripe/enums/stripe-exceptions.enum";
import { PaymentRepository } from "src/modules/payment/payment.repository";
import { PaymentStatus } from "src/enums/payment-status.enum";

@Injectable()
export class BuySubscriptionService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly planRepository: PlanRepository,
    private readonly sessionStripeRepository: SessionStripeRepository,
    private readonly subscriptionRepo: SubscriptionRepository,
    private readonly subscriptionStripeRepository: SubscriptionStripeRepository,
    private readonly subscriptionStripeService: SubscriptionStripeService,
    private readonly paymentRepository: PaymentRepository
  ) {}
  async handleSubscribe(planId: number, userId: number): Promise<string> {
    try {
      // await this.userRepository.update(userId, {
      //   isSubscribed: false,
      //   activeSubscriptionId: null,
      // });
      // return "User is not subscribed";
      const userData = await this.getUserOrThrow(userId);
      this.checkUserSubscription(userData.userIsSubscribed);
      const plan = await this.getPlanOrThrow(planId);
      const existingSubscription = await this.subscriptionRepo.findByPlanId(
        planId,
        userId
      );

      if (!existingSubscription?.dataValues) {
        const localPaymentIntend = await this.paymentRepository.createPayment({
          userId,
          status: PaymentStatus.PENDING,
          planId: plan.id,
          customerStripeId: userData.userCustomerStripeId,
          amount: plan.price,
          currency: plan.currency,
          customerEmail: userData.userEmail,
        });
        return await this.createNewSubscription(
          userId,
          plan,
          userData.userCustomerStripeId,
          localPaymentIntend.id
        );
      }
      return await this.handleExistingSubscription(
        existingSubscription.dataValues,
        plan,
        userId,
        userData.userCustomerStripeId
      );
    } catch (error) {
      throw error;
    }
  }
  private async getUserOrThrow(
    userId: number
  ): Promise<{
    userIsSubscribed: boolean;
    userCustomerStripeId: string;
    userEmail: string;
  }> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new CustomException({
        message: `User with this id: ${userId} not found`,
        statusCode: 400,
        errorCode: SubscriptionExceptionCodes.USER_NOT_FOUND,
        module: ModuleType.SUBSCRIPTION_MODULE,
      });
    }
    return {
      userIsSubscribed: user.isSubscribed,
      userCustomerStripeId: user.customerStripeId,
      userEmail: user.email,
    };
  }
  private checkUserSubscription(isUserSubscribed: boolean) {
    if (isUserSubscribed) {
      throw new CustomException({
        message: `User already subscribed`,
        statusCode: 400,
        errorCode: SubscriptionExceptionCodes.USER_ALREADY_SUBSCRIBED,
        module: ModuleType.SUBSCRIPTION_MODULE,
      });
    }
  }
  private async getPlanOrThrow(planId: number): Promise<ProductPlan> {
    const plan = await this.planRepository.findById(planId);
    if (!plan) {
      throw new CustomException({
        message: `Plan with this id: ${planId} not found`,
        statusCode: 400,
        errorCode: SubscriptionExceptionCodes.PLAN_NOT_FOUND,
        module: ModuleType.SUBSCRIPTION_MODULE,
      });
    }
    return plan;
  }
  private async createNewSubscription(
    userId: number,
    plan: ProductPlan,
    customerStripeId: string,
    paymentIntentId: number
  ): Promise<string> {
    try {
      const url = await this.sessionStripeRepository.createCheckoutSession(
        {
          userId,
          priceStripeId: plan.stripePriceId!,
          planId: plan.id!,
          interval: plan.interval!,
          customerStripeId,
        },
        paymentIntentId
      );
      return url;
    } catch (error) {
      throw error;
    }
  }
  private async handleExistingSubscription(
    existingSubscription: SubscriptionData,
    plan: ProductPlan,
    userId: number,
    customerStripeId: string
  ): Promise<string> {
    try {
      switch (existingSubscription.status) {
        case SubscriptionStatus.ACTIVE:
          return "Subscription is already active.";
        case SubscriptionStatus.CANCELED:
          return await this.resumeCanceledSubscription(
            existingSubscription,
            userId
          );

        case SubscriptionStatus.EXPIRED:
          return await this.renewExpiredSubscription(
            plan,
            userId,
            customerStripeId
          );
        case SubscriptionStatus.INITIALIZED:

        default:
          throw new CustomException({
            message: `Unknown subscription status: ${existingSubscription.status}`,
            statusCode: 400,
            errorCode: SubscriptionExceptionCodes.UNKNOWN_SUBSCRIPTION_STATUS,
            module: ModuleType.SUBSCRIPTION_MODULE,
          });
      }
    } catch (error) {
      throw error;
    }
  }
  private async resumeCanceledSubscription(
    subscription: SubscriptionData,
    userId: number
  ): Promise<string> {
    try {
      const stripeSub =
        await this.subscriptionStripeRepository.subscriptionRetrieve(
          subscription.subscriptionStripeId
        );
      if (stripeSub.status === "active" && stripeSub.cancel_at_period_end) {
        await Promise.all([
          this.subscriptionStripeService.subscriptionUpdate(stripeSub.id, {
            cancel_at_period_end: false,
          }),
          this.subscriptionRepo.updateSubscription(subscription.id, {
            status: SubscriptionStatus.ACTIVE,
            updateAt: new Date(),
          }),
          this.userRepository.update(userId, {
            isSubscribed: true,
            activeSubscriptionId: subscription.id,
          }),
        ]);
        return "Subscription resumed successfully.";
      }
      return "Subscription resumed successfully.";
    } catch (error) {
      throw error;
    }
  }
  private async renewExpiredSubscription(
    plan: ProductPlan,
    userId: number,
    customerStripeId: string
  ): Promise<string> {
    try {
      const localPaymentIntend = await this.paymentRepository.createPayment({
        userId,
        planId: plan.id,
        customerStripeId,
        amount: plan.price,
        currency: plan.currency,
        status: PaymentStatus.PENDING,
      });
      const url = await this.createNewSubscription(
        userId,
        plan,
        customerStripeId,
        localPaymentIntend.id
      );

      return url;
    } catch (error) {
      throw error;
    }
  }
}
