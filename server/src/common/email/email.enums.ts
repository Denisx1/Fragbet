export enum EmailExceptionCodes {
  USER_NOT_AUTHORIZED = "USER_NOT_AUTHORIZED",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USERS_EMAIL_NOT_CONFIRMED = "USERS_EMAIL_NOT_CONFIRMED",
}

export enum ActionEmailType {
  FORGOT_PASSWORD = "forgotPassword",
  CONFIRM_EMAIL = "confirmEmail",
  PAYMENT_FAILED = "paymentFailed",
  PAYMENT_SUCCESSFUL = "paymentSuccessful",
  PLAN_APPROVED = "planApproved",
  PLAN_REJECTED = "planRejected",
  PLAN_PENDING = "planPending",
  SUBSCRIPTION_RENEWED = "subscriptionRenewed",
  SUBSCRIPTION_EXPIRED = "subscriptionExpired",
  SUBSCRIPTION_SUSPENDED = "subscriptionSuspended",
  SUBSCRIPTION_COMPLETED = "subscriptionCompleted",
  SESSION_EXPIRED = "sessionExpired",
  UPCOMING_SUBSCRIPTION_PAYMENT_REMINDER = "upcomingSubscriptionPaymentReminder",
  GOT_A_ONE_OFF_MATCH = "gotAOneOffMatch",
}
