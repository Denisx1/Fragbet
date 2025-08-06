import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../user/user.model";
import { ProductPlan } from "../plan/plan-model";
import { SubscriptionCreationAttrs } from "./subscription.interface";
import { SubscriptionStatus } from "./enums/subscription-status.enum";
import { Payment } from "../payment/payment.model";

@Table({ tableName: "subscriptions" })
export class Subscription extends Model<
  Subscription,
  SubscriptionCreationAttrs
> {
  @Column({ primaryKey: true, autoIncrement: true })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => ProductPlan)
  @Column({ allowNull: false })
  declare planId: number;

  @BelongsTo(() => ProductPlan)
  declare plan: ProductPlan;

  @Column({
    type: DataType.ENUM(...Object.values(SubscriptionStatus)),
    allowNull: false,
  })
  declare status: SubscriptionStatus;

  @HasMany(() => Payment) // Связь с платежами
  declare payments: Payment[];

  @Column({ type: DataType.STRING, allowNull: true })
  declare subscriptionStripeId: string;

  @Column({ type: DataType.DATE, allowNull: true })
  declare startDate: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  declare endDate: Date;
}
