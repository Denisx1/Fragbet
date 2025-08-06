import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Region } from "../../region/model/region.model";


interface CountryAttributes {
  id: number;
  name: string;
  code: string;
  region_id: number;
}

export interface CountryCreationAttributes
  extends Optional<CountryAttributes, "id"> {}

export class Country
  extends Model<CountryAttributes, CountryCreationAttributes>
  implements CountryAttributes
{
  public id!: number;
  public name!: string;
  public code!: string;
  public region_id!: number;

  public region!: Region;
}

export const initCountry = (sequelize: Sequelize) => {
  Country.init(
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
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      region_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "regions",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "countries",
      timestamps: false,
    }
  );
};
