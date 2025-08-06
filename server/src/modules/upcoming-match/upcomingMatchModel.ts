import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
} from "sequelize-typescript";


import { AiPrediction } from "src/modules/prediction/prediction.model";
import { Team } from "src/modules/team/team.model";
import { Tier } from "../tier/models/tier.model";
import { Game } from "../tier/models/game.model";

export type MatchStatus =
  | "upcoming"
  | "live"
  | "finished"
  | "cancelled"
  | "defwin";

@Table({
  tableName: "matches",
  timestamps: false,
})
export class Match extends Model<Match> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  bo3_slug!: string;

  @Column({
    type: DataType.ENUM("upcoming", "live", "finished", "cancelled", "defwin"),
    allowNull: false,
  })
  status!: MatchStatus;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bo_type!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tier!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  start_date!: Date;

  @ForeignKey(() => Team)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  team1_id!: number;
  
  @ForeignKey(() => Team)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  team2_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  stars!: number;

  @ForeignKey(() => Tier)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  tier_id!: number;

  @HasMany(() => Game)
  games?: Game[];

  @HasOne(() => AiPrediction)
  ai_predictions?: AiPrediction;

  @BelongsTo(() => Team, "team1_id")
  team1?: Team;

  @BelongsTo(() => Team, "team2_id")
  team2?: Team;
}
