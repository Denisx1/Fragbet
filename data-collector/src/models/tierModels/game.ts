import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { MatchStatus } from "../../enums/match-status-enum";
import { Match } from "hltv";

interface GameAttributes {
  id: number;
  match_id: number
  number: number; // Номер игры в матче (например, 1, 2, 3)
  status: string; // Статус игры
}

export interface GameCreationAttributes extends Optional<GameAttributes, "id"> {}

export class Game
  extends Model<GameAttributes, GameCreationAttributes>
  implements GameAttributes
{
  public id!: number;
  public match_id!: number;
  public number!: number;
  public status!: string;

}

export const initGame = (sequelize: Sequelize) => {
  Game.init(
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
        }, // Один матч - одна предсказка
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("upcoming", "live", "finished", "cancelled"),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "games",
      timestamps: false,
    }
  );
};
