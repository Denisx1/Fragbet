import { IUserData } from "src/modules/user/user.interfaces";

export class UserDto {
  id: number;
  email: string;
  isEmailConfirm: boolean;
  activeSubscriptionId: number | null;
  isSubscribed: boolean;
  customerStripeId: string;

  setData(user: IUserData) {
    this.id = user.id;
    this.email = user.email;
    this.isEmailConfirm = user.isEmailConfirm;
    this.activeSubscriptionId = user.activeSubscriptionId;
    this.isSubscribed = user.isSubscribed;
    this.customerStripeId = user.customerStripeId;
  }
}
