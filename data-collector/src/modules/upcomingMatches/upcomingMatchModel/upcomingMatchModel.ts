import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Game } from "../../upcomingMatchGames/gameModel/gameModel";
import { AiPrediction } from "../../aiPrediction/ai_predictionModel/ai_predictionModel";
import { Team } from "hltv";


interface MatchAttributes {
  id: number;
  bo3_slug: string;
  status: string; // Предполагаемые статусы
  bo_type: number;
  start_date: string;
  tier: string;
  team1_id: number;
  team2_id: number;
  stars: number;
  tier_id: number;
}

export interface MatchCreationAttributes
  extends Optional<MatchAttributes, "id"> {}

export class Match
  extends Model<MatchAttributes, MatchCreationAttributes>
  implements MatchAttributes
{
  public id!: number;
 
  public bo3_slug!: string;
  public status!: string;
  public bo_type!: number;
 
  public tier!: string;
  public start_date!: string;
  public team1_id!: number;
  public team2_id!: number;
  public stars!: number;
  public tier_id!: number;
  public readonly games!: Game[];
  public readonly ai_predictions!: AiPrediction;
  public readonly team1!: Team;
  public readonly team2!: Team;
}

export const initMatch = (sequelize: Sequelize) => {
  Match.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true, // ID из API как первичный ключ
        autoIncrement: true,
      },
      
      bo3_slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.ENUM(
          "upcoming",
          "live",
          "finished",
          "cancelled",
          "defwin"
        ),
        allowNull: false,
      },
      bo_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      tier: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      team1_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      team2_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      stars: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      tier_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "tier",
          key: "tier_id",
        },
      },
    },
    {
      sequelize,
      tableName: "matches",
      timestamps: false,
    }
  );
};
