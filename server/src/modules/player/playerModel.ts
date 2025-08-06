import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Team } from "../team/team.model";

@Table({ tableName: "players", timestamps: false })
export class Player extends Model<Player> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  player_slug: string;

  @Column({ type: DataType.STRING, allowNull: false })
  player_nickname: string;

  @Column({ type: DataType.STRING, allowNull: false })
  player_image_url: string;

  @Column({ type: DataType.STRING, allowNull: false })
  team_slug: string;

  @Column({ type: DataType.STRING, allowNull: false })
  team_name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  team_image_url: string;

  @ForeignKey(() => Team)
  @Column({ type: DataType.INTEGER, allowNull: true })
  team_id: number;

  @BelongsTo(() => Team)
  team: Team;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isTeamStub: boolean;
}
