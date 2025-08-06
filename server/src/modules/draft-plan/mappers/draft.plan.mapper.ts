import { DraftPlanCreationAttrs } from "../draft-plan-model";

import { CreateDraftPlanDto } from "../dto/create-draft-plan.dto";

export class DraftPlanMapper {
  static toDraftPlanCreationAttrs(
    draftPlan: CreateDraftPlanDto,
    productId: number,
    createdByUserId: number
  ): DraftPlanCreationAttrs {
    const amount = Math.round(draftPlan.price * 100);
    const draftPlanData: DraftPlanCreationAttrs = {
      name: draftPlan.name,
      description: draftPlan.description,
      price: amount,
      currency: draftPlan.currency,
      interval: draftPlan.interval,
      status: "pending",
      approved: false,
      createdByUserId,
      productId,
    };
    return draftPlanData;
  }
}
