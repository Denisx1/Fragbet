import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
import { Tier } from './tier.model';

  
  @Table({ tableName: 'code', timestamps: false })
  export class Code extends Model<Code> {
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    })
    codeId!: number;
  
    @ForeignKey(() => Tier)
    @Column({ type: DataType.INTEGER, allowNull: false })
    tierId!: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    })
    codeValue!: string;
  
    @BelongsTo(() => Tier)
    tier!: Tier;
  }