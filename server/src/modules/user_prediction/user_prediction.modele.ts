import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../user/user.model";

export interface UserPredictionCreationAttrs {
  match_id: number;
  user_id: number;
  created_at: Date;
  ifFree: boolean;
}
@Table({ tableName: "user_prediction" })
export class UserPrediction extends Model<
  UserPrediction,
  UserPredictionCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare match_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare ifFree: boolean;
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at: Date;
}
