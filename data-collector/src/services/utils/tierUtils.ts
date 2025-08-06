// import { ITeamData } from "../../interfaces/teamInterfaces";
// import {
//   GameData,
//   IAiPrediction,
//   MatchData,
//   TournamentDetails,
// } from "../../interfaces/tierInterfaces";
// import { Match } from "../../models/tierModels/match";
// import { ICodeRepository } from "../../repository/tierRepository/interfaces/codeInterfaces";
// import { IUtilsDependencies } from "../lowLevelServices/interfaces/tierFillerInterface";

// export function extractTeamName(slug: string): [string, string] {

//   const parts = slug.split("-");
//   // Ищем дату (DD-MM-YYYY)
//   let dateStartIndex = -1;
//   for (let i = parts.length - 3; i >= 0; i--) {
//     const possibleDate = parts.slice(i, i + 3).join("-");
//     if (/^\d{2}-\d{2}-\d{4}$/.test(possibleDate)) {
//       dateStartIndex = i;
//       break;
//     }
//   }

//   if (dateStartIndex === -1) {
//     console.warn(`Could not find date in slug: ${slug}`);
//     return ["", ""];
//   }

//   const teamsPart = parts.slice(0, dateStartIndex).join("-");
//   const [team1WithPrefix, team2WithPrefix] = teamsPart.split("vs");

//   if (!team1WithPrefix || !team2WithPrefix) {
//     console.warn(`Invalid slug format (missing 'vs'): ${slug}`);
//     return ["", ""];
//   }

//   // Обрабатываем team1
//   let cleanTeam1: string;
//   if (team1WithPrefix.startsWith("-") && !team1WithPrefix.startsWith("--")) {
//     // Если один дефис в начале, сохраняем его
//     cleanTeam1 = team1WithPrefix.replace(/-+$/g, "").trim();
//   } else {
//     // Убираем все лишние дефисы
//     cleanTeam1 = team1WithPrefix.replace(/^-+|-+$/g, "").trim();
//   }

//   // Обрабатываем team2
//   let cleanTeam2: string;
//   if (team2WithPrefix.startsWith("--")) {
//     // Если два дефиса, оставляем один
//     cleanTeam2 =
//       "-" + team2WithPrefix.replace(/^--+/, "").replace(/-+$/g, "").trim();
//   } else {
//     // Убираем все лишние дефисы
//     cleanTeam2 = team2WithPrefix.replace(/^-+|-+$/g, "").trim();
//   }

//   return [cleanTeam1, cleanTeam2];
// }

// export const delay = (ms: number): Promise<void> =>
//   new Promise((resolve) => setTimeout(resolve, ms));

// export const matchWithTierAndTournament = async (
//   allMatches: Omit<MatchData, "id">[],
//   dependencies: IUtilsDependencies
// ): Promise<Omit<MatchData & { tier_id: number }, "id">[]> => {
//   try {
//     const createdTournaments = await dependencies.tournamentRepo?.findAll();

//     const tournamentMap: Map<number, number> = new Map(
//       createdTournaments?.map((tournament: TournamentDetails) => [
//         tournament.outside_id,
//         tournament.id,
//       ])
//     );
//     const uniqueTiers = [
//       ...new Set(allMatches.map((match: Omit<MatchData, "id">) => match.tier)),
//     ];

//     const codeRecords = await Promise.all(
//       uniqueTiers.map((tier) => dependencies.codeRepo?.findByValue(tier))
//     );
//     const codeMap = new Map(
//       codeRecords.map((code) => [code!.codeValue, code!.tierId])
//     );
//     codeRecords.forEach((record, i) => {
//       const tier = uniqueTiers[i];
//       if (record) {
//         codeMap.set(tier, record.tierId);
//       }
//     });
//     const result: Omit<MatchData & { tier_id: number }, "id">[] = [];

//     for (const match of allMatches) {
//       const tournament_id = tournamentMap.get(match.tournament_id);
//       const tier_id = codeMap.get(match.tier);

//       if (tournament_id === undefined || tier_id === undefined) {
//         console.warn(
//           `⛔️ Пропущен матч ${match.slug}: нет tournament_id или tier_id`
//         );
//         continue; // пропустить матч
//       }

//       result.push({
//         ...match,
//         tournament_id,
//         tier_id,
//       });
//     }
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

// // Входной тип с match_slug
// export type PredictionWithSlug = IAiPrediction & {
//   match_slug: string;
// };

// export type GameWithSlug = GameData & {
//   match_slug: string;
// };

// // Выходной тип с match_id (без match_slug)
// export type PredictionWithId = Omit<IAiPrediction, "match_slug"> & {
//   match_id: number;
// };

// export type GameWithId = Omit<GameData, "match_slug"> & {
//   match_id: number;
// };
// export const matchPredictionWithMatches = async (
//   predictionsToCreate: Omit<PredictionWithSlug, "match_id">[],
//   dependencies: IUtilsDependencies
// ): Promise<PredictionWithId[]> => {
//   const matchesFromDb = await dependencies.matchesRepo?.getAllMatches();

//   if (!matchesFromDb) throw new Error("No matches found in DB");

//   const matchMap = new Map(
//     matchesFromDb.map((match) => [match.slug, match.id])
//   );

//   return predictionsToCreate.map((prediction) => {
//     const match = matchMap.get(prediction.match_slug);

//     if (!match) {
//       throw new Error(`Match not found for slug: ${prediction.match_slug}`);
//     }

//     const { match_slug, ...rest } = prediction;
//     return {
//       ...rest,
//       match_id: match,
//     };
//   });
// };

// export const matchGamesWithMatches = async (
//   gamesToCreate: Omit<GameWithSlug, "match_id">[],
//   dependencies: IUtilsDependencies
// ): Promise<GameWithId[]> => {
//   const matchesFromDb = await dependencies.matchesRepo?.getAllMatches();
//   if (!matchesFromDb) throw new Error("No matches found in DB");

//   const matchMap = new Map(matchesFromDb.map((match) => [match.slug, match]));

//   return gamesToCreate.map((game) => {
//     const match = matchMap.get(game.match_slug);

//     if (!match) {
//       throw new Error(`Match not found for slug: ${game.match_slug}`);
//     }
//     const { match_slug, ...rest } = game;

//     return {
//       ...rest,
//       match_id: match.id,
//     };
//   });
// };

// export const updateMatch = (
//   matches: Omit<MatchData & { tier_id: number }, "ai_prediction" | "games">[],
//   teams: { slug: string; id: number }[],
//   predictionToCreate: PredictionWithId[]
// ): {
//   updatedMatches: Omit<
//     MatchData & { tier_id: number },
//     "ai_prediction" | "games"
//   >[];
//   updatedPredictions: Omit<IAiPrediction, "match_slug">[];
// } => {
//   try {
//     if (matches === undefined) {
//       throw new Error("No matches found");
//     }
//     if (teams === undefined) {
//       throw new Error("No teams found");
//     }
//     if (predictionToCreate === undefined) {
//       throw new Error("No predictions found");
//     }
//     const updatedMatches: Omit<
//       MatchData & { tier_id: number },
//       "ai_prediction" | "games"
//     >[] = [];
//     const updatedPredictions: Omit<IAiPrediction, "match_slug">[] = [];

//     for (const match of matches) {
//       const cleanSlug = match.slug.replace(/--vs-/, "-vs-"); // превращаем двойной дефис в один
//       const [team1Slug, team2SlugWithDate] = cleanSlug.split("-vs-");
//       const team2Slug = team2SlugWithDate.split("-").slice(0, -3).join("-");

//       const team1 = teams.find((team) => team.slug === team1Slug);
//       const team2 = teams.find((team) => team.slug === team2Slug);

//       if (!team1 || !team2) {
//         console.warn(
//           `Team is being skipped. Team hasn't been found: ${
//             team1Slug ?? team1Slug
//           } or ${team2Slug ?? team2Slug}`
//         );
//         continue;
//       }
//       const updateData: Omit<
//         MatchData & { tier_id: number },
//         "ai_prediction" | "games"
//       > = {
//         ...match, // Spread the entire match object
//         team1_id: team1.id,
//         team1: team1.id.toString(),
//         team2_id: team2.id,
//         team2: team2.id.toString(),
//       };
//       const prediction = predictionToCreate.find(
//         (p) => p.match_id === match.id
//       );
//       if (prediction) {
//         // Проверяем, какой команды соответствует победа по баллам
//         let winnerTeamId: number | null = null;

//         if (
//           prediction.prediction_team1_score > prediction.prediction_team2_score
//         ) {
//           winnerTeamId = team1.id; // Победила команда 1
//         } else if (
//           prediction.prediction_team2_score > prediction.prediction_team1_score
//         ) {
//           winnerTeamId = team2.id; // Победила команда 2
//         }

//         // Обновляем winner_team_id в предсказаниях
//         if (winnerTeamId !== null) {
//           updatedPredictions.push({
//             ...prediction,
//             prediction_winner_team_id: winnerTeamId,
//           });
//         }
//       }
//       updatedMatches.push(updateData);
//     }
//     return { updatedMatches, updatedPredictions };
//   } catch (error) {
//     throw error;
//   }
// };
