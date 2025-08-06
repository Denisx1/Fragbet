import { InjectModel } from "@nestjs/sequelize";
import { DraftPlan, DraftPlanCreationAttrs } from "./draft-plan-model";
import { Injectable } from "@nestjs/common";
import { CreateDraftPlanDto } from "./dto/create-draft-plan.dto";
import { UpdateDraftPlanDto } from "./dto/update-draft-plan-dto";

@Injectable()
export class DraftPlanRepository {
  constructor(
    @InjectModel(DraftPlan) private readonly draftPlanModel: typeof DraftPlan
  ) {}

  async createDraftPlan(draftPlanData: DraftPlanCreationAttrs) {
    return this.draftPlanModel.create(draftPlanData);
  }
  async findOneById(id: number) {
    return this.draftPlanModel.findByPk(id,{include: { all: true }});
  }

  async updateDraftPlan(id: number, draftPlanData: UpdateDraftPlanDto) {
    return this.draftPlanModel.update(draftPlanData, {
      where: { id },
      returning: true,
    });
  }
}
