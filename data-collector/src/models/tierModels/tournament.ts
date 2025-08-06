// import { DataTypes, Model, Optional, Sequelize } from "sequelize";
// import { Tier } from "./tier";
// import { MatchStatus } from "../../enums/match-status-enum";
// import { Match } from "./match";

// interface TournamentAttributes {
//   id: number;
//   outside_id: number;
//   name: string;
//   slug: string;
//   status: string;
//   prize: number;
//   start_date: Date;
//   tier: string;

//   pickem_presence: boolean;
//   image_url: string;
// }

// export interface TournamentCreationAttributes
//   extends Optional<TournamentAttributes, "id"> {}

// export class Tournament
//   extends Model<TournamentAttributes, TournamentCreationAttributes>
//   implements TournamentAttributes
// {
//   public id!: number;
//   public outside_id!: number;
//   public name!: string;
//   public slug!: string;
//   public status!: MatchStatus;
//   public prize!: number;
//   public start_date!: Date;
//   public tier!: string;

//   public pickem_presence!: boolean;
//   public image_url!: string;
// }

// export const initTournament = (sequelize: Sequelize) => {
//   Tournament.init(
//     {
//       id: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       outside_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       slug: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       status: {
//         type: DataTypes.ENUM(...Object.values(MatchStatus)),
//         allowNull: false,
//       },
//       prize: {
//         type: DataTypes.INTEGER,
//         allowNull: true, // Дозволяємо null, як у даних
//         defaultValue: null, // За замовчуванням null, а не 0
//       },
//       start_date: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//       tier: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: "",
//       },
//       pickem_presence: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//       },
//       image_url: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       tableName: "tournaments",
//       timestamps: false,
//     }
//   );
// };
