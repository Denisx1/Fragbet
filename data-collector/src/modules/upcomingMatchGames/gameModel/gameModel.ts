import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface GameAttributes {
  id: number;
  match_id: number;
  number: number; // Номер игры в матче (например, 1, 2, 3)
  status: string; // Статус игры
  complete: boolean;
  finished: boolean;
  begin_at: string;
  end_at: string;
  map: string;
}

export interface GameCreationAttributes
  extends Optional<GameAttributes, "id" | "begin_at" | "end_at" | "map"> {}

export class Game
  extends Model<GameAttributes, GameCreationAttributes>
  implements GameAttributes
{
  public id!: number;
  public match_id!: number;
  public number!: number;
  public status!: string;
  public complete!: boolean;
  public finished!: boolean;
  public begin_at!: string;
  public end_at!: string;
  public map!: string;
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
        type: DataTypes.ENUM("upcoming", "live", "finished", "cancelled", "not_started"),
        allowNull: false,
      },
      complete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      finished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      begin_at: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      end_at: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      map: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      tableName: "games",
      timestamps: false,
    }
  );
};
