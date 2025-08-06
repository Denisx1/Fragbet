import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Team } from "../../../models/teamModels/teamModel";

interface PlayerStatAttribute {
  id: number;
  team_slug: string;
  team_name: string;
  rounds_count: number;
  round_wins_count: number;
  t_rounds_count: number;
  t_round_wins_count: number;
  ct_rounds_count: number;
  ct_round_wins_count: number;
  pistol_rounds_count: number;
  pistol_round_wins_count: number;
  overtime_rounds_count: number;
  overtime_round_wins_count: number;
  eco_rounds_count: number;
  eco_round_wins_count: number;
  force_rounds_count: number;
  force_round_wins_count: number;
  full_buy_rounds_count: number;
  full_buy_round_wins_count: number;
  full_eco_vs_full_buy_rounds_count: number;
  full_eco_vs_full_buy_round_wins_count: number;
  full_buy_vs_full_eco_rounds_count: number;
  full_buy_vs_full_eco_round_wins_count: number;
  semi_eco_vs_full_buy_rounds_count: number;
  semi_eco_vs_full_buy_round_wins_count: number;
  full_buy_vs_semi_eco_rounds_count: number;
  full_buy_vs_semi_eco_round_wins_count: number;
  same_economy_level_rounds_count: number;
  same_economy_level_round_wins_count: number;
  money_save: number;
  money_spent: number;
  bomb_plant_rounds_count: number;
  bomb_plant_round_wins_count: number;
  bomb_plant_fake_rounds_count: number;
  bomb_plant_fake_round_wins_count: number;
  bomb_defuse_rounds_count: number;
  bomb_defuse_round_wins_count: number;
  bomb_defuse_fake_rounds_count: number;
  bomb_defuse_fake_round_wins_count: number;
  target_bombed_count: number;
  open_kills_sum: number;
  open_kills_round_wins_count: number;
  open_deaths_sum: number;
  open_deaths_round_wins_count: number;
  kills: number;
  deaths: number;
  assists: number;
  flash_assists: number;
  shots: number;
  hits: number;
  headshots: number;
  trade_kills: number;
  trade_deaths: number;
  clutches: number;
  damage_deal: number;
  damage_receive: number;
  grenades_damage: number;
  got_grenades_damage: number;
  drops_gave_value: number;
  drops_got_value: number;
  alive_time: string; // Возможно, это можно конвертировать в число, если нужно
  movement_distance: number;
  avg_team_distance: number;
  smoke_covered_enemies: number;
  team_id: number;
}

export interface TeamStatsCreationAttributes
  extends Optional<PlayerStatAttribute, "id"> {}

export class TeamStats
  extends Model<PlayerStatAttribute, TeamStatsCreationAttributes>
  implements PlayerStatAttribute
{
  public id!: number;
  public team_slug!: string;
  public team_name!: string;
  public rounds_count!: number;
  public round_wins_count!: number;
  public t_rounds_count!: number;
  public t_round_wins_count!: number;
  public ct_rounds_count!: number;
  public ct_round_wins_count!: number;
  public pistol_rounds_count!: number;
  public pistol_round_wins_count!: number;
  public overtime_rounds_count!: number;
  public overtime_round_wins_count!: number;
  public eco_rounds_count!: number;
  public eco_round_wins_count!: number;
  public force_rounds_count!: number;
  public force_round_wins_count!: number;
  public full_buy_rounds_count!: number;
  public full_buy_round_wins_count!: number;
  public full_eco_vs_full_buy_rounds_count!: number;
  public full_eco_vs_full_buy_round_wins_count!: number;
  public full_buy_vs_full_eco_rounds_count!: number;
  public full_buy_vs_full_eco_round_wins_count!: number;
  public semi_eco_vs_full_buy_rounds_count!: number;
  public semi_eco_vs_full_buy_round_wins_count!: number;
  public full_buy_vs_semi_eco_rounds_count!: number;
  public full_buy_vs_semi_eco_round_wins_count!: number;
  public same_economy_level_rounds_count!: number;
  public same_economy_level_round_wins_count!: number;
  public money_save!: number;
  public money_spent!: number;
  public bomb_plant_rounds_count!: number;
  public bomb_plant_round_wins_count!: number;
  public bomb_plant_fake_rounds_count!: number;
  public bomb_plant_fake_round_wins_count!: number;
  public bomb_defuse_rounds_count!: number;
  public bomb_defuse_round_wins_count!: number;
  public bomb_defuse_fake_rounds_count!: number;
  public bomb_defuse_fake_round_wins_count!: number;
  public target_bombed_count!: number;
  public open_kills_sum!: number;
  public open_kills_round_wins_count!: number;
  public open_deaths_sum!: number;
  public open_deaths_round_wins_count!: number;
  public kills!: number;
  public deaths!: number;
  public assists!: number;
  public flash_assists!: number;
  public shots!: number;
  public hits!: number;
  public headshots!: number;
  public trade_kills!: number;
  public trade_deaths!: number;
  public clutches!: number;
  public damage_deal!: number;
  public damage_receive!: number;
  public grenades_damage!: number;
  public got_grenades_damage!: number;
  public drops_gave_value!: number;
  public drops_got_value!: number;
  public alive_time!: string;
  public movement_distance!: number;
  public avg_team_distance!: number;
  public smoke_covered_enemies!: number;
  public team_id!: number;

  public team!: Team;


}

export const initTeamStats = (sequelize: Sequelize) => {
  TeamStats.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      team_slug: DataTypes.STRING,
      team_name: DataTypes.STRING,
      rounds_count: DataTypes.INTEGER,
      round_wins_count: DataTypes.INTEGER,
      t_rounds_count: DataTypes.INTEGER,
      t_round_wins_count: DataTypes.INTEGER,
      ct_rounds_count: DataTypes.INTEGER,
      ct_round_wins_count: DataTypes.INTEGER,
      pistol_rounds_count: DataTypes.INTEGER,
      pistol_round_wins_count: DataTypes.INTEGER,
      overtime_rounds_count: DataTypes.INTEGER,
      overtime_round_wins_count: DataTypes.INTEGER,
      eco_rounds_count: DataTypes.INTEGER,
      eco_round_wins_count: DataTypes.INTEGER,
      force_rounds_count: DataTypes.INTEGER,
      force_round_wins_count: DataTypes.INTEGER,
      full_buy_rounds_count: DataTypes.INTEGER,
      full_buy_round_wins_count: DataTypes.INTEGER,
      full_eco_vs_full_buy_rounds_count: DataTypes.INTEGER,
      full_eco_vs_full_buy_round_wins_count: DataTypes.INTEGER,
      full_buy_vs_full_eco_rounds_count: DataTypes.INTEGER,
      full_buy_vs_full_eco_round_wins_count: DataTypes.INTEGER,
      semi_eco_vs_full_buy_rounds_count: DataTypes.INTEGER,
      semi_eco_vs_full_buy_round_wins_count: DataTypes.INTEGER,
      full_buy_vs_semi_eco_rounds_count: DataTypes.INTEGER,
      full_buy_vs_semi_eco_round_wins_count: DataTypes.INTEGER,
      same_economy_level_rounds_count: DataTypes.INTEGER,
      same_economy_level_round_wins_count: DataTypes.INTEGER,
      money_save: DataTypes.INTEGER,
      money_spent: DataTypes.INTEGER,
      bomb_plant_rounds_count: DataTypes.INTEGER,
      bomb_plant_round_wins_count: DataTypes.INTEGER,
      bomb_plant_fake_rounds_count: DataTypes.INTEGER,
      bomb_plant_fake_round_wins_count: DataTypes.INTEGER,
      bomb_defuse_rounds_count: DataTypes.INTEGER,
      bomb_defuse_round_wins_count: DataTypes.INTEGER,
      bomb_defuse_fake_rounds_count: DataTypes.INTEGER,
      bomb_defuse_fake_round_wins_count: DataTypes.INTEGER,
      target_bombed_count: DataTypes.INTEGER,
      open_kills_sum: DataTypes.INTEGER,
      open_kills_round_wins_count: DataTypes.INTEGER,
      open_deaths_sum: DataTypes.INTEGER,
      open_deaths_round_wins_count: DataTypes.INTEGER,
      kills: DataTypes.INTEGER,
      deaths: DataTypes.INTEGER,
      assists: DataTypes.INTEGER,
      flash_assists: DataTypes.INTEGER,
      shots: DataTypes.INTEGER,
      hits: DataTypes.INTEGER,
      headshots: DataTypes.INTEGER,
      trade_kills: DataTypes.INTEGER,
      trade_deaths: DataTypes.INTEGER,
      clutches: DataTypes.INTEGER,
      damage_deal: DataTypes.INTEGER,
      damage_receive: DataTypes.INTEGER,
      grenades_damage: DataTypes.INTEGER,
      got_grenades_damage: DataTypes.INTEGER,
      drops_gave_value: DataTypes.INTEGER,
      drops_got_value: DataTypes.INTEGER,
      alive_time: DataTypes.STRING, // Можно преобразовать в секунды (INTEGER) при необходимости
      movement_distance: DataTypes.INTEGER,
      avg_team_distance: DataTypes.INTEGER,
      smoke_covered_enemies: DataTypes.INTEGER,
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "teams",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "team_stats",
      timestamps: false,
    }
  );
};