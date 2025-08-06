import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Code } from "./code";

import { Match } from "hltv";

interface TierAttributes {
  tier_id: number;
  tierName: "low_tier" | "high_tier";
}

interface TierCreationAttributes extends Optional<TierAttributes, "tier_id"> {}

export class Tier
  extends Model<TierAttributes, TierCreationAttributes>
  implements TierAttributes
{
  public tier_id!: number;
  public tierName!: "low_tier" | "high_tier";

  public readonly codes?: Code[];
  public readonly matches!: Match[];
}
export const initTier = (sequelize: Sequelize) => {
  Tier.init(
    {
      tier_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,

      },
      tierName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "tier",
      timestamps: false,
    }
  );
};
