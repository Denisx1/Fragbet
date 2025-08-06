import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { RoleCreationAttrs } from "./roles.interfaces";
import { User } from "../user/user.model";
import { UserRoles } from "./user-roles.model";
import { RolesEnum } from "src/enums/roles.enum";

@Table({ tableName: "roles", timestamps: false })
export class Role extends Model<Role, RoleCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: RolesEnum.USER,
  })
  declare value: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: [],
  })
  declare permissions: string[];

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
