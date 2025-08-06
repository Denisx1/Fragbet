
import { BelongsTo, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Country } from "./countryModel";

interface RegionAttributes {
    id: number;
    name: string;
  }
  
  interface RegionCreationAttributes {
    name: string;
  }
  
  @Table({ tableName: 'regions', timestamps: false })
  export class Region extends Model<RegionAttributes, RegionCreationAttributes> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;
  
    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;
  
    @HasMany(() => Country)
    countries: Country[];
  }
  