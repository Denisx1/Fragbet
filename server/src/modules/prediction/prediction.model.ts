import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Match } from "../upcoming-match/upcomingMatchModel";


@Table({
  tableName: "ai_predictions",
  timestamps: false,
})
export class AiPrediction extends Model<AiPrediction> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Match)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true, // Только одна предсказка на матч
  })
  match_id!: number;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  match_slug!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  prediction_team1_score!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  prediction_team2_score!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  prediction_winner_team_id!: number;

  @BelongsTo(() => Match)
  match?: Match;
}
