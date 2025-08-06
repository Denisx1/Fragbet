import { DataTypes } from "sequelize";
import {
  Column,
  Table,
  HasOne,
  HasMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Country } from "./optionalModels/countryModel";
import { Model } from "sequelize-typescript";
import { TeamStats } from "../team-stat/teamStatModel";
import { Player } from "../player/playerModel";
import { Match } from "../upcoming-match/upcomingMatchModel";

@Table({ tableName: "teams", timestamps: false })
export class Team extends Model<Team> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  })
  slug!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  acronym!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  image_url!: string;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: true,
  })
  rank!: number;

  @ForeignKey(() => Country)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: true,
  })
  country_id!: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: true,
  })
  six_month_earned!: number;

  @BelongsTo(() => Country)
  country: Country; // Связь с моделью Country

  @HasOne(() => TeamStats)
  stats: TeamStats;

  @HasMany(() => Player)
  players: Player[];

  @HasMany(() => Match, "team1_id")
  homeMatches?: Match[];

  @HasMany(() => Match, "team2_id")
  awayMatches?: Match[];
}
