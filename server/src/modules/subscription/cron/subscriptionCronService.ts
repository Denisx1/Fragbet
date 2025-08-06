import { Injectable } from "@nestjs/common";
import { SubscriptionRepository } from "../subscription.repository";
import { SubscriptionStripeRepository } from "src/modules/stripe/repositories/subscription-stripe-repository";
import { UserRepository } from "src/modules/user/user.repository";
import { Cron, CronExpression } from "@nestjs/schedule";
import { SubscriptionStatus } from "../enums/subscription-status.enum";
import { EmailService } from "src/common/email/email.service";
import { ActionEmailType } from "src/common/email/email.enums";

@Injectable()
export class SubscriptionCronService {
  constructor(
    private readonly subscriptionRepo: SubscriptionRepository,
    private readonly subscriptionStripeRepository: SubscriptionStripeRepository,
    private readonly emailService: EmailService,
    private readonly userRepo: UserRepository
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_9PM)
  async handleExpiredSubscriptions() {
    console.log("Checking for expired subscriptions...");

    const subscriptions =
      await this.subscriptionRepo.findExpiredSubscriptions(); // Находим все истекшие подписки

    for (const subscription of subscriptions) {
      await this.updateSubscriptionStatus(subscription);
    }
  }

  private async updateSubscriptionStatus(subscription: any) {
    const currentDate = Date.now();
    const subscriptionStripe =
      await this.subscriptionStripeRepository.subscriptionRetrieve(
        subscription.subscriptionStripeId
      );

    if (!subscriptionStripe) {
      console.error(
        "Subscription not found in Stripe:",
        subscription.subscriptionStripeId
      );
      return;
    }

    const isCanceled = this.isSubscriptionCanceled(subscriptionStripe.status);
    const isScheduledForCancellation = this.isScheduledForCancellation(
      subscriptionStripe.cancel_at_period_end,
      subscriptionStripe.cancel_at,
      currentDate
    );

    let status = subscription.status;

    if (isCanceled || isScheduledForCancellation) {
      const endDate = new Date(
        subscriptionStripe.ended_at! * 1000 ||
          subscriptionStripe.cancel_at! * 1000
      );
      status = SubscriptionStatus.EXPIRED;
      await this.subscriptionRepo.updateSubscription(subscription.id, {
        status,
        endDate,
        updateAt: new Date(),
      });
      await this.userRepo.update(+subscription.userId, {
        isSubscribed: false,
        activeSubscriptionId: null,
      });
      this.emailService.sendEmail(
        subscription.dataValues.user.email!,
        ActionEmailType.SUBSCRIPTION_EXPIRED,
        {
          frontendUrl: process.env.FRONTEND_URL!,
        }
      );
    }

    console.log(`Updated subscription ${subscription.id} to status: ${status}`);
  }

  private isSubscriptionCanceled(status: string): boolean {
    return status === "canceled";
  }

  private isScheduledForCancellation(
    cancelAtPeriodEnd: boolean,
    cancelAt: number | null,
    currentDate: number
  ): boolean {
    return (
      cancelAtPeriodEnd && cancelAt !== null && currentDate >= cancelAt * 1000
    );
  }
}
