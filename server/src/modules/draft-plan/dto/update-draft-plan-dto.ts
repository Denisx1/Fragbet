import { z } from "zod";

export const UpdateDraftPlanDtoSchema = z.object({
  updateByUserId: z.number(),
  updateAt: z.date(),
  approved: z.boolean(),
  status: z.enum(["pending", "approved", "rejected"]),
});

export type UpdateDraftPlanDto = z.infer<typeof UpdateDraftPlanDtoSchema>;
