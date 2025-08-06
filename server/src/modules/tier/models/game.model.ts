import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Match } from "src/modules/upcoming-match/upcomingMatchModel";


export type GameStatus = "upcoming" | "live" | "finished" | "cancelled";

@Table({
  tableName: "games",
  timestamps: false,
})
export class Game extends Model<Game> {
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
  })
  match_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  number!: number;

  @Column({
    type: DataType.ENUM(
      "upcoming",
      "live",
      "finished",
      "cancelled",
      "not_started"
    ),
    allowNull: false,
  })
  status!: GameStatus;
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  complete!: boolean;
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  finished!: boolean;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  begin_at!: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  end_at!: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  map!: string;

  @BelongsTo(() => Match)
  match?: Match;
}
