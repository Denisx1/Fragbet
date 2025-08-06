import {
  BelongsTo,
  Column,
    DataType,
    ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Product } from "../product/product.modele";
import { User } from "../user/user.model";
import { PlanInterval } from "./enums/plan-interval.enam";
import { PlanCurrency } from "./enums/plan-currence.enam";

export interface ProductPlanCreationAttrs {
  name: string;
  description: string;
  stripePriceId: string;
  price: number;
  currency: PlanCurrency;
  interval: PlanInterval;
  approvedByUserId: number;
  createdByUserId: number;
  productId: number;
}

@Table({ tableName: "product_plans", timestamps: false })
export class ProductPlan extends Model<ProductPlan, ProductPlanCreationAttrs> {
  @Column({ primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ allowNull: false })
  declare name: string; // Название плана (например, "1 месяц")

  @Column({ allowNull: false })
  declare description: string;

  @Column({ allowNull: false })
  declare stripePriceId: string; // ID плана в Paddle

  @Column({ allowNull: false })
  declare price: number;

  @Column({ type: DataType.ENUM(...Object.values(PlanCurrency)), allowNull: false })
  declare currency: PlanCurrency;

  @Column({ type: DataType.ENUM(...Object.values(PlanInterval)), allowNull: false })
  declare interval: PlanInterval;
  
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  declare approvedByUserId: number;

  @BelongsTo(() => User)
  declare approvedByUser: User;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  declare createdByUserId: number;

  @BelongsTo(() => User)
  declare createdByUser: User;

  @ForeignKey(() => Product)
  @Column({ allowNull: false })
  declare productId: number;

  @BelongsTo(() => Product)
  declare product: Product;
}
