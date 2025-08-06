import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../user/user.model";
import { AuthCreationAttrs } from "./auth.interfaces";

@Table({ tableName: "auth", timestamps: false })
export class Auth extends Model<Auth, AuthCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.STRING, allowNull: false })
  declare accessToken: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare refreshToken: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare ip: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare userAgent: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare device: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare os: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare browser: string;
}
