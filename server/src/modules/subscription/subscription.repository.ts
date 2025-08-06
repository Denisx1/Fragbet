import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Subscription } from "./subscription.model";
import {
  SubscriptionCreationAttrs,
  SubscriptionData,
} from "./subscription.interface";
import { UpdateSubscriptionDto } from "./dto/update-subscription-dto";
import { SubscriptionStatus } from "./enums/subscription-status.enum";
import { Op } from "sequelize";
import { Payment } from "../payment/payment.model";

import { ProductPlan } from "../plan/plan-model";
import { User } from "../user/user.model";
import { Invoice } from "../invoice/invoice.model";
@Injectable()
export class SubscriptionRepository {
  constructor(
    @InjectModel(Subscription) private subscriptionModel: typeof Subscription
  ) {}

  async createSubscription(
    subscriptionDto: SubscriptionCreationAttrs
  ): Promise<SubscriptionData> {
    return this.subscriptionModel.create(subscriptionDto, {
      include: { all: true },
    });
  }
  async findOneById(id: number): Promise<Subscription | null> {
    return this.subscriptionModel.findByPk(id);
  }
  async findOneByStripeId(stripeId: string): Promise<Subscription | null> {
    return this.subscriptionModel.findOne({
      where: { subscriptionStripeId: stripeId },
      include: [
        {
          model: ProductPlan,
        },
      ],
    });
  }
  async updateSubscription(
    id: number,
    updateSubscriptionDto: UpdateSubscriptionDto
  ): Promise<SubscriptionData> {
    return this.subscriptionModel
      .update(updateSubscriptionDto, {
        where: { id },
        returning: true,
      })
      .then((res) => res[1][0]);
  }
  findExpiredSubscriptions() {
    return this.subscriptionModel.findAll({
      where: {
        status: {
          [Op.or]: [SubscriptionStatus.ACTIVE, SubscriptionStatus.CANCELED],
        },
      },
      raw: true,
    });
  }
  async findByPlanId(
    planId: number,
    userId: number
  ): Promise<Subscription | null> {
    return this.subscriptionModel.findOne({ where: { planId, userId } });
  }
  async findBySomeId(
    typeId: string,
    id: string | number
  ): Promise<Subscription | null> {
    return this.subscriptionModel.findOne({
      where: { [typeId]: id },
      include: [
        {
          model: Payment,
          include: [
            {
              model: Invoice,
            },
          ],
        },
        {
          model: ProductPlan,
        },
        {
          model: User,
        },
      ],
    });
  }
}
