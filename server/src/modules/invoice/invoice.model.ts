import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Payment } from "../payment/payment.model";
import { InvoiceCreationAttrs } from "./invoice.types";

@Table({
  tableName: "invoices",
  timestamps: true,
})
export class Invoice extends Model<Invoice, InvoiceCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare stripeInvoiceId: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare status: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare date: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  amountDue: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  amountPaid: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  invoicePDFUrl: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  hostedInvoiceUrl: string;

  @ForeignKey(() => Payment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  paymentId: number;

  @BelongsTo(() => Payment)
  payment: Payment;
}
