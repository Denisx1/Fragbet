export interface UserCreationAttrs {
  email: string;
  password: string;
  customerStripeId: string;
}

export interface IUserData {
  id: number;
  email: string;
  password: string;
  isEmailConfirm: boolean;
  isSubscribed: boolean;
  activeSubscriptionId: number | null;
  customerStripeId: string;
}
