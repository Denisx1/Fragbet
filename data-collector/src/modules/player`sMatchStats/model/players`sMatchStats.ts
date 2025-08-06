import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Player } from '../../player/model/playerModel'

interface PlayerStatsAttributes {
  id: number;
  steam_profile_nickname: string;
  player_slug: string;
  player_nickname: string;
  player_image_url: string;
  player_country_code: string;
  team_clan_name: string;
  team_slug: string;
  player_rating: number;
  player_rating_value: number;
  total_player_rating_value: number;
  hits: number;
  shots: number;
  kills: number;
  multikills: number;
  death: number;
  assists: number;
  damage: number;
  first_kills: number;
  first_death: number;
  trade_kills: number;
  trade_death: number;
  headshots: number;
  accuracy: number;
  headshots_accuracy: number;
  money_save: number;
  total_equipment_value: number;
  avg_kill_cost: number;
  avg_100dmg_cost: number;
  player_id: number;
}

export interface PlayerStatsCreationAttributes
  extends Optional<PlayerStatsAttributes, "id"> {}

export class PlayerStats
  extends Model<PlayerStatsAttributes, PlayerStatsCreationAttributes>
  implements PlayerStatsAttributes
{
  public id!: number;
  public steam_profile_nickname!: string;
  public player_slug!: string;
  public player_nickname!: string;
  public player_image_url!: string;
  public player_country_code!: string;
  public team_clan_name!: string;
  public team_slug!: string;
  public player_rating!: number;
  public player_rating_value!: number;
  public total_player_rating_value!: number;
  public hits!: number;
  public shots!: number;
  public kills!: number;
  public multikills!: number;
  public death!: number;
  public assists!: number;
  public damage!: number;
  public first_kills!: number;
  public first_death!: number;
  public trade_kills!: number;
  public trade_death!: number;
  public headshots!: number;
  public accuracy!: number;
  public headshots_accuracy!: number;
  public money_save!: number;
  public total_equipment_value!: number;
  public avg_kill_cost!: number;
  public avg_100dmg_cost!: number;
  public player_id!: number;
  
  public player!: Player;
}

export const initPlayerStats = (sequelize: Sequelize) => {
  PlayerStats.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      steam_profile_nickname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      player_slug: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      player_nickname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      player_image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      player_country_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      team_clan_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      team_slug: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      player_rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      player_rating_value: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total_player_rating_value: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      hits: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      shots: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      kills: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      multikills: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      death: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      assists: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      damage: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      first_kills: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      first_death: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      trade_kills: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      trade_death: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      headshots: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      accuracy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      headshots_accuracy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      money_save: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total_equipment_value: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      avg_kill_cost: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      avg_100dmg_cost: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      player_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "players",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "player_stats",
    }
  );
};
