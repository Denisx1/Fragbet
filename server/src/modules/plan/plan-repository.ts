import { InjectModel } from "@nestjs/sequelize";
import { ProductPlan, ProductPlanCreationAttrs } from "./plan-model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PlanRepository {
  constructor(
    @InjectModel(ProductPlan)
    private readonly productPlanModel: typeof ProductPlan
  ) {}

  async createPlan(planData: ProductPlanCreationAttrs) {
    return this.productPlanModel.create(planData);
  }
  async findById(id: number) {
    return this.productPlanModel.findByPk(id, { include: { all: true } });
  }
}
