import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import { Team } from '../team/team.model'; // импорт своей модели команды
  
  @Table({ tableName: 'team_stats', timestamps: false })
  export class TeamStats extends Model<TeamStats> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;
  
    @Column(DataType.STRING)
    team_slug: string;
  
    @Column(DataType.STRING)
    team_name: string;
  
    @Column(DataType.INTEGER)
    rounds_count: number;
  
    @Column(DataType.INTEGER)
    round_wins_count: number;
  
    @Column(DataType.INTEGER)
    t_rounds_count: number;
  
    @Column(DataType.INTEGER)
    t_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    ct_rounds_count: number;
  
    @Column(DataType.INTEGER)
    ct_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    pistol_rounds_count: number;
  
    @Column(DataType.INTEGER)
    pistol_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    overtime_rounds_count: number;
  
    @Column(DataType.INTEGER)
    overtime_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    eco_rounds_count: number;
  
    @Column(DataType.INTEGER)
    eco_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    force_rounds_count: number;
  
    @Column(DataType.INTEGER)
    force_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    full_buy_rounds_count: number;
  
    @Column(DataType.INTEGER)
    full_buy_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    full_eco_vs_full_buy_rounds_count: number;
  
    @Column(DataType.INTEGER)
    full_eco_vs_full_buy_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    full_buy_vs_full_eco_rounds_count: number;
  
    @Column(DataType.INTEGER)
    full_buy_vs_full_eco_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    semi_eco_vs_full_buy_rounds_count: number;
  
    @Column(DataType.INTEGER)
    semi_eco_vs_full_buy_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    full_buy_vs_semi_eco_rounds_count: number;
  
    @Column(DataType.INTEGER)
    full_buy_vs_semi_eco_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    same_economy_level_rounds_count: number;
  
    @Column(DataType.INTEGER)
    same_economy_level_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    money_save: number;
  
    @Column(DataType.INTEGER)
    money_spent: number;
  
    @Column(DataType.INTEGER)
    bomb_plant_rounds_count: number;
  
    @Column(DataType.INTEGER)
    bomb_plant_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    bomb_plant_fake_rounds_count: number;
  
    @Column(DataType.INTEGER)
    bomb_plant_fake_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    bomb_defuse_rounds_count: number;
  
    @Column(DataType.INTEGER)
    bomb_defuse_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    bomb_defuse_fake_rounds_count: number;
  
    @Column(DataType.INTEGER)
    bomb_defuse_fake_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    target_bombed_count: number;
  
    @Column(DataType.INTEGER)
    open_kills_sum: number;
  
    @Column(DataType.INTEGER)
    open_kills_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    open_deaths_sum: number;
  
    @Column(DataType.INTEGER)
    open_deaths_round_wins_count: number;
  
    @Column(DataType.INTEGER)
    kills: number;
  
    @Column(DataType.INTEGER)
    deaths: number;
  
    @Column(DataType.INTEGER)
    assists: number;
  
    @Column(DataType.INTEGER)
    flash_assists: number;
  
    @Column(DataType.INTEGER)
    shots: number;
  
    @Column(DataType.INTEGER)
    hits: number;
  
    @Column(DataType.INTEGER)
    headshots: number;
  
    @Column(DataType.INTEGER)
    trade_kills: number;
  
    @Column(DataType.INTEGER)
    trade_deaths: number;
  
    @Column(DataType.INTEGER)
    clutches: number;
  
    @Column(DataType.INTEGER)
    damage_deal: number;
  
    @Column(DataType.INTEGER)
    damage_receive: number;
  
    @Column(DataType.INTEGER)
    grenades_damage: number;
  
    @Column(DataType.INTEGER)
    got_grenades_damage: number;
  
    @Column(DataType.INTEGER)
    drops_gave_value: number;
  
    @Column(DataType.INTEGER)
    drops_got_value: number;
  
    @Column(DataType.STRING)
    alive_time: string;
  
    @Column(DataType.INTEGER)
    movement_distance: number;
  
    @Column(DataType.INTEGER)
    avg_team_distance: number;
  
    @Column(DataType.INTEGER)
    smoke_covered_enemies: number;
  
    @ForeignKey(() => Team)
    @Column({ type: DataType.INTEGER, allowNull: false })
    team_id: number;
  
    @BelongsTo(() => Team)
    team: Team;
  }