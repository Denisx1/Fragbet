import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductPlan } from "./plan-model";
import { PlanRepository } from "./plan-repository";


@Module({
  imports: [SequelizeModule.forFeature([ProductPlan])],
  controllers: [],
  providers: [PlanRepository ],
  exports: [PlanRepository],
})
export class PlanModule {}
