import { DataTypes, Model, Optional, Sequelize } from "sequelize";

import { Team } from "../../../models/teamModels/teamModel";
import { PlayerMatches } from "../../player`sMatches/model/player`sMatchModel";

interface PlayerAttributes {
  id: number;
  player_slug: string;
  player_nickname: string;
  player_image_url: string;
  team_slug: string;
  team_name: string;
  team_image_url: string;
  team_id: number | null;
  isTeamStub: boolean;
}

export interface PlayerCreationAttributes
  extends Optional<PlayerAttributes, "id"> {}

export class Player
  extends Model<PlayerAttributes, PlayerCreationAttributes>
  implements PlayerAttributes
{
  public id!: number;
  public player_slug!: string;
  public player_nickname!: string;
  public player_image_url!: string;
  public team_slug!: string;
  public team_name!: string;
  public team_image_url!: string;
  public team_id!: number | null;
  public isTeamStub!: boolean;

  public team!: Team;
  public matches!: PlayerMatches[];
}

export const initPlayerModel = (sequelize: Sequelize) => {
  Player.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      player_slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      player_nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      player_image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      team_slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      team_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      team_image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "teams", // Ссылка на таблицу teams
          key: "id",
        },
      },
      isTeamStub: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "players", // Уточняем имя таблицы
      timestamps: false,
    }
  );
};
