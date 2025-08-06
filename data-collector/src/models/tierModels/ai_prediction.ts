import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Match } from "./match";


interface AiPredictionAttributes {
  id: number;
  match_id: number;
  match_slug: string;
  prediction_team1_score: number;
  prediction_team2_score: number;
  prediction_winner_team_id: number;
}

export interface AiPredictionCreationAttributes
  extends Optional<AiPredictionAttributes, "id"> {}

export class AiPrediction
  extends Model<AiPredictionAttributes, AiPredictionCreationAttributes>
  implements AiPredictionAttributes
{
  public id!: number;
  public match_slug!: string;
  public match_id!: number;
  public prediction_team1_score!: number;
  public prediction_team2_score!: number;
  public prediction_winner_team_id!: number;

  public readonly match?: Match;
}
export const initAiPrediction = (sequelize: Sequelize) => {
  AiPrediction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      match_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "matches",
          key: "id",
        },
        unique: true, // Один матч - одна предсказка
      },
      match_slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prediction_team1_score: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      prediction_team2_score: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      prediction_winner_team_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "ai_predictions",
      timestamps: false,
    }
  );
};
