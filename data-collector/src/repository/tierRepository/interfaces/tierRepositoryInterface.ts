import { Tier } from "../../../../models/postgre/tierModels";

export type ITier = {
  tierName: "low_tier" | "high_tier";
}

export interface ITierRepository {
  createTiers(tiers: ITier[]): Promise<Tier[]>;
  findByName(tierName: ITier): Promise<Tier | null>;
}
