import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ProductPlan } from "src/modules/plan/plan-model";

export interface ProductCreationAttrs {
  name: string;
  description: string;
  stripeProductId: string;
}

@Table({ tableName: "products", timestamps: false })
export class Product extends Model<Product, ProductCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare stripeProductId: string;

  @Column({ defaultValue: true })
  declare isActive: boolean;

  @HasMany(() => ProductPlan)
  declare plans: ProductPlan[];
}
