import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Tier } from "./tier";




interface CodeAttributes {
  codeId: number;
  tierId: number;
  codeValue: string;
}

export interface CodeCreationAttributes extends Optional<CodeAttributes, "codeId"> {}

export class Code
  extends Model<CodeAttributes, CodeCreationAttributes>
  implements CodeAttributes
{
  public codeId!: number;
  public tierId!: number;
  public codeValue!: string;
}

export const initCode = (sequelize: Sequelize) => {
  Code.init(
    {
      codeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Tier,
          key: "tier_id",
        },
      },
      codeValue: {
        type: DataTypes.STRING,
        allowNull: true,
        unique:true
      },
    },
    {
      sequelize,
      tableName: "code",
      timestamps: false,
    }
  );
};
