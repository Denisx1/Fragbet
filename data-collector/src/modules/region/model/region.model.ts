import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface RegionAttributes {
  id: number;
  name: string;
  slug: string;
}

export interface RegionCreationAttributes
  extends Optional<RegionAttributes, "id"> {}

export class Region
  extends Model<RegionAttributes, RegionCreationAttributes>
  implements RegionAttributes
{
  public id!: number;
  public name!: string;
  public slug!: string;
}

export const initRegion = (sequelize: Sequelize) => {
  Region.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
    },
    {
      sequelize,
      tableName: "regions",
      timestamps: false,
    }
  );
};
