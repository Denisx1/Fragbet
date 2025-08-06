import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
  } from 'sequelize-typescript';
import { Code } from './code.model';
import { Match } from 'src/modules/upcoming-match/upcomingMatchModel';



  
  export type TierName = 'low_tier' | 'high_tier';
  
  @Table({
    tableName: 'tier',
    timestamps: false,
  })
  export class Tier extends Model<Tier> {
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    })
    tier_id!: number;
  
    @Column({
      type: DataType.ENUM('low_tier', 'high_tier'),
      allowNull: false,
    })
    tierName!: TierName;
  
    @HasMany(() => Code)
    codes?: Code[];
  
    @HasMany(() => Match)
    matches?: Match[];
  }