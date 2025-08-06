export class CreateSubscriptionDto {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly durationDays: number;
  readonly interval: "day" | "week" | "month" | "year";
  readonly billingCycle: {
    interval: "day" | "week" | "month" | "year";
    frequency: number;
  };
  readonly trialPeriod: {
    interval: "day" | "week" | "month" | "year";
    frequency: number;
  };
  readonly subscriptionType: "regular" | "trial";
}
