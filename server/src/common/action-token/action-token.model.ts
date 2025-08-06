import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ActionEmailType } from "src/common/email/email.enums";
import { User } from "src/modules/user/user.model";

export interface ActionTokenCreationAttrs {
  userId: number;
  token: string;
  actionType: string;
}

@Table({ tableName: "action-token", timestamps: true })
export class ActionToken extends Model<ActionToken, ActionTokenCreationAttrs> {
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
  declare token: string;

  @Column({
    type: DataType.STRING,
    values: Object.values(ActionEmailType),
    allowNull: false,
  })
  declare actionType: ActionEmailType;
}
