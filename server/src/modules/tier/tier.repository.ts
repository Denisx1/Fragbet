import { Injectable } from "@nestjs/common";
import { Tier } from "./models/tier.model";
import { InjectModel } from "@nestjs/sequelize";
import { Code } from "./models/code.model";

import { Op } from "sequelize";
import { Game } from "./models/game.model";
import { Team } from "../team/team.model";
import { Player } from "../player/playerModel";
import { AiPrediction } from "../prediction/prediction.model";
import { Match } from "../upcoming-match/upcomingMatchModel";
import { Country } from "../team/optionalModels/countryModel";
import { Region } from "../team/optionalModels/regionModel";

@Injectable()
export class TierRepository {
  constructor(@InjectModel(Tier) private tierModel: typeof Tier) {}

  async findAll(): Promise<{ lowTier: Tier | null; highTier: Tier | null }> {
    const threeDaysLater = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    const tiers = await this.tierModel.findAll({
      where: {
        tierName: { [Op.in]: ["low_tier", "high_tier"] },
      },
      include: [
        {
          model: Match,
          include: [
            { model: AiPrediction, required: false },

            {
              model: Team,
              as: "team1",
              attributes: ["name", "image_url", "id"],
              required: false,
              // include: [
              //   {
              //     model: Country,
              //     attributes: ["id", "name", "code"],
              //     include: [
              //       {
              //         model: Region,
              //         attributes: ["id", "name", "slug"],
              //         as: "region",
              //       },
              //     ],
              //   },
              // ],
            },
            {
              model: Team,
              as: "team2",
              required: false,
              attributes: ["name", "image_url", "id"],
              // include: [
              //   {
              //     model: Country,
              //     attributes: ["id", "name", "code"],
              //     include: [
              //       {
              //         model: Region,
              //         attributes: ["id", "name", "slug"],
              //         as: "region",
              //       },
              //     ],
              //   },
              // ],
            },
          ],
          where: {
            start_date: {
              [Op.between]: [new Date(), threeDaysLater],
            },
            status: "upcoming",
          },
          required: false,
        },
        {
          model: Code,
          attributes: ["codeValue"],
          required: false,
        },
      ],
    });

    const plainTiers = tiers.map((tier) => tier.get({ plain: true }));

    const lowTier = plainTiers.find((t) => t.tierName === "low_tier") || null;
    const highTier = plainTiers.find((t) => t.tierName === "high_tier") || null;

    return { lowTier, highTier };
  }
}
