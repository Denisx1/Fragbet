import { DraftPlan } from "../draft-plan-model";

import { PriceCreationAttrs } from "src/modules/stripe/interfaces/price-interface";

export class DraftPriceMapper {
  static toStripePriceParams(draftPlan: DraftPlan): PriceCreationAttrs {
    const amount = Math.round(draftPlan.price * 100);
    return {
      currency: draftPlan.currency,
      recurring: {
        interval: draftPlan.interval,
      },
      unit_amount: amount,

      product: draftPlan.product.stripeProductId,
    };
  }
}
