import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Product } from "src/modules/product/product.modele";
import { User } from "src/modules/user/user.model";

export interface DraftPlanCreationAttrs {
  productId: number;
  name: string;
  description: string;
  price: number;
  currency: "USD" | "EUR";
  interval: "month" | "year" | "week" | "day";
  status: "pending" | "approved" | "rejected";
  approved: boolean;
  createdByUserId: number;
}

@Table({ tableName: "draft_plans", timestamps: true })
export class DraftPlan extends Model<DraftPlan, DraftPlanCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  declare productId: string; // ID продукта

  @BelongsTo(() => Product)
  declare product: Product; // Связь с продуктом

  @Column(DataType.STRING)
  declare name: string; // Название плана

  @Column(DataType.STRING)
  declare description: string; // Описание плана

  @Column(DataType.INTEGER)
  declare price: number; // Цена плана

  @Column({ type: DataType.STRING })
  declare currency: "USD" | "EUR"; // Валюта плана

  @Column({ type: DataType.STRING, allowNull: false })
  declare interval: "month" | "year" | "week" | "day"; // Интервал подписки (например, месяц, год, неделя, день)

  @Column({ type: DataType.STRING, allowNull: false })
  declare status: "pending" | "approved" | "rejected";

  @Column({ type: DataType.BOOLEAN })
  declare approved: boolean; // Флаг одобрения плана

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  declare updateByUserId: number; // ID пользователя, который одобрил

  @BelongsTo(() => User)
  declare updateByUser: User; // Пользователь, который одобрил

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  declare createdByUserId: number; // ID пользователя, который создал

  @BelongsTo(() => User)
  declare createdByUser: User; // Пользователь, который создал

  @Column(DataType.DATE)
  declare updateAt: Date; // Дата одобрения
}
