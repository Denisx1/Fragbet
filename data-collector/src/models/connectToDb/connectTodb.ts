import { initModels } from "..";
import { AiPrediction } from "../../modules/aiPrediction/ai_predictionModel/ai_predictionModel";
import { Match } from "../../modules/upcomingMatches/upcomingMatchModel/upcomingMatchModel";
import { Player } from "../../modules/player/model/playerModel";
import { Game } from "../../modules/upcomingMatchGames/gameModel/gameModel";
import { Team } from '../../modules/team/model/team.model'
import initSequelize from "./sequelize";
import { TeamStats } from '../../modules/teamStats/model/teamStatsModel';

export const connectToDataBase = async () => {
  try {
   
    await initSequelize.authenticate();
    initModels(initSequelize); // Инициализируем модели
     await Match.sync({force: true});
     await Game.sync({force: true});
     await AiPrediction.sync({force: true});
     await Team.sync({force: true});
     await TeamStats.sync({force: true});
     await Player.sync({force: true});


    // await initSequelize.sync(); // Обновляем структуру базы данных
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Error disconnecting from Postgres:", error);
    process.exit(1);
  }
};

export const disconnectFromDataBase = async () => {
  try {
    await initSequelize.close();

    console.log("Disconnected from the database.");
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
    process.exit(1);
  }
};
