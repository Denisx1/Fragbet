import { Sequelize } from "sequelize";
import { initTier, Tier } from "./tierModels/tier";
import { Code, initCode } from "./tierModels/code";
// import { initTournament, Tournament } from "./tierModels/tournament";

import {
  initGame,
  Game,
} from "../modules/upcomingMatchGames/gameModel/gameModel";
import {
  AiPrediction,
  initAiPrediction,
} from "../modules/aiPrediction/ai_predictionModel/ai_predictionModel";

import { initRegion, Region } from "./teamModels/regionModel";

import {
  initMatch,
  Match,
} from "../modules/upcomingMatches/upcomingMatchModel/upcomingMatchModel";
import {
  initTeamStats,
  TeamStats,
} from "../modules/teamStats/model/teamStatsModel";
import { initCountry, Country } from "../modules/country/model/country.model";
import { initTeam, Team } from "../modules/team/model/team.model";
import { initPlayerModel, Player } from "../modules/player/model/playerModel";
import {
  initPlayerMatches,
  PlayerMatches,
} from "../modules/player`sMatches/model/player`sMatchModel";
import {
  initPlayerStats,
  PlayerStats,
} from "../modules/player`sMatchStats/model/players`sMatchStats";

export const initModels = (sequelize: Sequelize) => {
  // Инициализация всех моделей
  initTier(sequelize);
  initCode(sequelize);

  initRegion(sequelize);
  initCountry(sequelize);

  initMatch(sequelize);
  initGame(sequelize);
  initAiPrediction(sequelize);

  initTeam(sequelize);
  initTeamStats(sequelize);

  initPlayerModel(sequelize);
  // initPlayerMatches(sequelize);
  // initPlayerStats(sequelize);

  // Проверка, что модели инициализированы
  if (!Tier.sequelize) throw new Error("Tier model not initialized");
  if (!Code.sequelize) throw new Error("Code model not initialized");
  // if (!Tournament.sequelize)
  //   throw new Error("Tournament model not initialized");
  if (!Match.sequelize) throw new Error("Match model not initialized");
  if (!Game.sequelize) throw new Error("Game model not initialized");
  if (!AiPrediction.sequelize)
    throw new Error("AiPrediction model not initialized");

  if (!Team.sequelize) throw new Error("Team model not initialized");
  if (!Region.sequelize) throw new Error("Region model not initialized");
  if (!Country.sequelize) throw new Error("Country model not initialized");

  // if (!Player.sequelize) throw new Error("Player model not initialized");
  // if (!PlayerMatches.sequelize)
  //   throw new Error("PlayerMatches model not initialized");
  // if (!PlayerStats.sequelize)
  //   throw new Error("PlayerStats model not initialized");
  // if (!TeamStats.sequelize) throw new Error("TeamStats model not initialized");

  // Установка связей TIERs
  // Установка связей TIERs
  Tier.hasMany(Code, { foreignKey: "tier_id", as: "tierCodes" }); // ✅ Уникальный alias
  Code.belongsTo(Tier, { foreignKey: "tier_id", as: "tier" });

  Tier.hasMany(Match, { foreignKey: "tier_id", as: "tierMatches" }); // ✅
  Match.belongsTo(Tier, { foreignKey: "tier_id", as: "tierData" });

  Match.hasMany(Game, { foreignKey: "match_id" });
  Game.belongsTo(Match, { foreignKey: "match_id" });

  Match.hasOne(AiPrediction, {
    foreignKey: "id",
    as: "matchAiPrediction",
  }); // ✅
  AiPrediction.belongsTo(Match, { foreignKey: "id", as: "match" });

  Team.hasMany(AiPrediction, {
    foreignKey: "prediction_winner_team_id",
    as: "teamAiPrediction",
  });
  AiPrediction.belongsTo(Team, {
    foreignKey: "prediction_winner_team_id",
    as: "winnerTeam",
  });
  // В модели Match:
  Match.belongsTo(Team, { foreignKey: "team1_id", as: "team1" });
  Match.belongsTo(Team, { foreignKey: "team2_id", as: "team2" });
  // Установка связей TEAMs

  Country.hasOne(Region, { foreignKey: "region_id", as: "region" });
  Region.belongsTo(Country, { foreignKey: "region_id", as: "country" });

  Team.hasOne(TeamStats, {
    foreignKey: "team_id",
    as: "teamStats",
  });
  TeamStats.belongsTo(Team, {
    foreignKey: "team_id",
    as: "team",
  });

  Team.hasMany(Player, {
    foreignKey: "team_id",
    as: "players", // Псевдоним для обращения к массиву игроков
  });

  Player.belongsTo(Team, {
    foreignKey: "team_id",
    as: "team",
  });

  // Player.hasMany(PlayerMatches, {
  //   foreignKey: "player_id",
  //   as: "matches",
  // });

  // PlayerMatches.belongsTo(Player, {
  //   foreignKey: "player_id",
  //   as: "player",
  // });
  // Player.hasOne(PlayerStats, {
  //   foreignKey: "player_id",
  //   as: "playerStats",
  // });
  // PlayerStats.belongsTo(Player, {
  //   foreignKey: "player_id",
  //   as: "player",
  // });
};

export {
  Tier,
  Code,
  Match,
  Game,
  AiPrediction,
  Team,
  Region,
  Country,
  // Player,
  // PlayerMatches,
  // PlayerStats,
  TeamStats,
};
