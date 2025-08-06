import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Player } from "../../player/model/playerModel";

interface PlayerMatchesAttributes {
  id: number;

  outside_id: number;
  match_slug: string;

  player_id: number;
  player_slug: string;
  player_nickname: string;
  player_image_url: string;

  match_start_date: string;

  tournament_id: number;
  tournament_slug: string;

  team_id: number;
  team_slug: string;
  team_name: string;
  team_image_url: string;

  enemy_team_id: number;
  enemy_team_slug: string;
  enemy_team_name: string;
  enemy_team_image_url: string;

  for_game_ids: number[];
  for_game_map_name: string[];
  game_numbers: number[];
  game_wins: number[];
  rounds_count: number;
}

export interface PlayerMatchesCreationAttributes
  extends Optional<PlayerMatchesAttributes, "id"> {}

export class PlayerMatches
  extends Model<PlayerMatchesAttributes, PlayerMatchesCreationAttributes>
  implements PlayerMatchesAttributes
{
  public id!: number;

  public outside_id!: number;
  public match_slug!: string;

  public player_id!: number;
  public player_slug!: string;
  public player_nickname!: string;
  public player_image_url!: string;

  public match_start_date!: string;

  public tournament_id!: number;
  public tournament_slug!: string;

  public team_id!: number;
  public team_slug!: string;
  public team_name!: string;
  public team_image_url!: string;

  public enemy_team_id!: number;
  public enemy_team_slug!: string;
  public enemy_team_name!: string;
  public enemy_team_image_url!: string;

  public for_game_ids!: number[];
  public for_game_map_name!: string[];
  public game_numbers!: number[];
  public game_wins!: number[];
  public rounds_count!: number;

  public player!: Player;
}

export const initPlayerMatches = (sequelize: Sequelize) => {
  PlayerMatches.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      outside_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        allowNull: false,
      },
      match_slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      match_start_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tournament_slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      enemy_team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      enemy_team_slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      enemy_team_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      enemy_team_image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      for_game_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      for_game_map_name: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      game_numbers: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      game_wins: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      rounds_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "players",
          key: "id",
        },
      },
      tournament_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "player_matches",
      timestamps: false,
    }
  );
};
