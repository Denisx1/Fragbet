import {
  DataType,
  Model,
  Column,
  Table,
  HasOne,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import { Region } from "./regionModel";
import { Team } from "../team.model";

interface CountryAttributes {
  id: number;
  name: string;
  code: string;
  region_id: number;
}

interface CountryCreationAttributes {
  name: string;
  code: string;
  region_id: number;
}

@Table({ tableName: "countries", timestamps: false })
export class Country extends Model<
  CountryAttributes,
  CountryCreationAttributes
> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare code: string;

  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER, allowNull: false })
  region_id: number;

  @BelongsTo(() => Region)
  region: Region;

  @HasMany(() => Team)
  teams: Team[]; // Страна содержит много команд
}
