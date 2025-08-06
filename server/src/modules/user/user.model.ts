import {
  BelongsToMany,
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  ForeignKey,
  HasOne,
} from "sequelize-typescript";
import { UserCreationAttrs } from "./user.interfaces";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { Subscription } from "../subscription/subscription.model";
import { Payment } from "../payment/payment.model";
import { UserPrediction } from "../user_prediction/user_prediction.modele";

@Table({ tableName: "users", timestamps: false })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare isEmailConfirm: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare isSubscribed: boolean;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Subscription)
  subscriptions: Subscription[];

  @ForeignKey(() => Subscription)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare activeSubscriptionId: number | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare customerStripeId: string;

  @HasMany(() => Payment)
  payments: Payment[];

  @HasMany(() => UserPrediction)
  userPredictions: UserPrediction[];
}
