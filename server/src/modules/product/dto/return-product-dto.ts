import { ProductPlan } from "src/modules/plan/plan-model";

export class ReturnProductDto {
  id: number;
  name: string;
  description: string;
  stripeProductId: string;
  isActive: boolean;
  plans: ProductPlan[];
}
