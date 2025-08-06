import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Country } from "../../../models/teamModels/countryModel";


interface TeamAttributes {
  id: number;
  slug: string;
  name: string;
  image_url: string;
  rank: number;
  six_month_earned: number;
  acronym: string;
  country_id: number | null;
}

export interface TeamCreationAttributes
  extends Optional<TeamAttributes, "id"> {}

// Модель команды
export class Team
  extends Model<TeamAttributes, TeamCreationAttributes>
  implements TeamAttributes
{
  public id!: number;
  public slug!: string;
  public name!: string;
  public image_url!: string;
  public rank!: number;
  public six_month_earned!: number;
  public acronym!: string;
  public country_id!: number;

  public country!: Country; // Если у тебя есть модель ICountry
  //   public players!: Player[];
}

// Инициализация модели команды
export const initTeam = (sequelize: Sequelize) => {
  Team.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      acronym: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rank: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "countries",
          key: "id",
        },
      },
      six_month_earned: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },

    {
      sequelize,
      tableName: "teams",
      timestamps: false,
    }
  );
};
