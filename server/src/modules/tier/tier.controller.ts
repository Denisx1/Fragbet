import { Controller, Get } from "@nestjs/common";
import { Tier } from "./models/tier.model";
import { TierRepository } from "./tier.repository";

@Controller("tier")
export class TierController {
  constructor(private readonly tierRepository: TierRepository) {}

  @Get("all")
  async getAllTiers(): Promise<{
    lowTier: Tier | null;
    highTier: Tier | null;
  }> {
    const tiers = (await this.tierRepository.findAll()).highTier?.matches?.map(
      (match) => match
    );
    console.log(tiers);
    return await this.tierRepository.findAll();
  }
}
