import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Table,
} from "sequelize-typescript";
import { Model } from "sequelize-typescript";

import { Subscription } from "../subscription/subscription.model";
import { PaymentStatus } from "src/enums/payment-status.enum";
import { PaymentCreationAttrs } from "./interfaces/payment.inteface";
import { Invoice } from "../invoice/invoice.model";
import { User } from "../user/user.model";

@Table({ tableName: "payment", timestamps: true })
export class Payment extends Model<Payment, PaymentCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare amount: number;

  @Column({ type: DataType.STRING })
  declare currency: string;

  @ForeignKey(() => Subscription)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare subscriptionId: number;

  @BelongsTo(() => Subscription)
  
  declare subscription: Subscription;
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;
  @Column({ type: DataType.STRING, allowNull: true })
  declare customerStripeId: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare planId: number;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatus)),
    allowNull: false,
  })
  declare status: PaymentStatus;

  @HasOne(() => Invoice)
  declare invoice: Invoice;

  @Column({ type: DataType.STRING, allowNull: true })
  declare invoiceStripeId: string;

  @Column({ type: DataType.STRING })
  declare customerEmail: string;

  @Column({ type: DataType.STRING })
  declare errorMessage: string | null;
}
