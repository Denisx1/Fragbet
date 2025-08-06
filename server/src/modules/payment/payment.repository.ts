import { Injectable } from "@nestjs/common";
import { Payment } from "./payment.model";
import { InjectModel } from "@nestjs/sequelize";
import {
  PaymentCreationAttrs,
  PaymentUpdateAttrs,
} from "./interfaces/payment.inteface";
import { PaymentStatus } from "src/enums/payment-status.enum";
import { Op } from "sequelize";

@Injectable()
export class PaymentRepository {
  constructor(@InjectModel(Payment) private paymentModel: typeof Payment) {}

  async createPayment(payment: PaymentCreationAttrs): Promise<Payment> {
    const createdPayment = await this.paymentModel.create(payment);
    return createdPayment;
  }
  async updatePayment(
    paymentId: number,
    payment: PaymentUpdateAttrs
  ): Promise<Payment> {
    const [_, [updatedPayment]] = await this.paymentModel.update(payment, {
      where: { id: paymentId },
      returning: true,
    });
    return updatedPayment;
  }
  async findByPaymentId(paymentId: number) {
    return this.paymentModel.findOne({ where: { id: paymentId } });
  }
  async findBySubscriptionId(subscriptionId: number) {
    return this.paymentModel.findOne({ where: { subscriptionId } });
  }
  async findBySome(
    key: string,
    value: string | number
  ): Promise<Payment | null> {
    return this.paymentModel.findOne({ where: { [key]: value } });
  }
  async updateOtherPaymentsSubscriptionId(
    userId: number,
    planId: number,
    excludePaymentId: number,
    subscriptionId: number
  ): Promise<void> {
    await this.paymentModel.update(
      { subscriptionId },
      {
        where: {
          userId,
          planId,
          id: { [Op.ne]: excludePaymentId },
          status: { [Op.ne]: PaymentStatus.SUCCESS }, 
        },
      }
    );
  }
}
