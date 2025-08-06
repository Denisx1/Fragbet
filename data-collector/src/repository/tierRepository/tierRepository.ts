
import { Tier } from "../../models/tierModels/tier";
import { ITier, ITierRepository } from "./interfaces/tierRepositoryInterface";

export class TierRepository implements ITierRepository {
  async createTiers(tiers: ITier[]) {
    return Tier.bulkCreate(tiers, { updateOnDuplicate: ['tierName'], });
  }

  async findByName(tierName: ITier) {
    return Tier.findOne({ where: { tierName } });
  }
}