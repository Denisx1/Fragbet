// import { MatchData, TournamentDetails } from "../../interfaces/tierInterfaces";
// import { TierRepository } from "../../repository/tierRepository/tierRepository";
// import { TournamentRepository } from "../../repository/tierRepository/tournamentReository";

// import { GameRepository } from "../../repository/tierRepository/gameReposirory";
// import { AiPredictionRepository } from "../../repository/tierRepository/aiPredictionRepository";
// import { CodeRepository } from "../../repository/tierRepository/codeRepository";
// import { ITierData } from "../interfaces/tearServiceInterface";

// import { IDatabaseFillerDependencies } from "./interfaces/tierFillerInterface";
// import { Tier } from "../../models/tierModels/tier";

// import {
//   GameWithId,
//   GameWithSlug,
//   matchGamesWithMatches,
//   matchPredictionWithMatches,
//   matchWithTierAndTournament,
//   PredictionWithId,
//   PredictionWithSlug,
// } from "../utils/tierUtils";
// import { Code } from "../../models";

// class TierDbFiller {
//   constructor(private dependencies: IDatabaseFillerDependencies) {}

//   async fillDataBases(
//     tournamentsFromApi: Omit<TournamentDetails, "id">[],
//     tierData: ITierData
//   ): Promise<void> {
//     try {
//       const codeTiers = await this.createTiers();
//       await this.createCode(
//         codeTiers,
//         tierData.highTierCodes,
//         tierData.lowTierCodes
//       );

//       await this.createTournaments(tournamentsFromApi);

//       const { predictionToCreate, gamesToCreate } = await this.createMatches(
//         tierData.matches
//       );

//       await Promise.all([
//         this.createaiPrediction(predictionToCreate),
//         this.createGames(gamesToCreate),
//       ]);
//     } catch (error) {
//       throw error;
//     }
//   }

//   private async createCode(
//     tier: Tier[],
//     lowTierCodes: string[],
//     highTierCodes: string[]
//   ) {
//     try {
//       const lowTierId = tier[1].dataValues.tier_id;
//       const highTierId = tier[0].dataValues.tier_id;

//       const codesToCreate = [
//         ...lowTierCodes.map((codeValue) => ({ tierId: lowTierId, codeValue })),
//         ...highTierCodes.map((codeValue) => ({
//           tierId: highTierId,
//           codeValue,
//         })),
//       ];

//       await this.dependencies.codeRepo.createCode(codesToCreate);
//     } catch (error) {
//       throw error;
//     }
//   }
//   private async createTiers(): Promise<Tier[]> {
//     try {
//       const tiers = await this.dependencies.tierRepo.createTiers([
//         { tierName: "low_tier" },
//         { tierName: "high_tier" },
//       ]);
//       return tiers;
//     } catch (error) {
//       throw error;
//     }
//   }
//   private async createaiPrediction(
//     matchPredictions: PredictionWithId[]
//   ): Promise<void> {
//     try {
//       await this.dependencies.aiPredictionRepo.createPrediction(
//         matchPredictions
//       );
//     } catch (error) {
//       throw error;
//     }
//   }
//   private async createGames(matchGames: GameWithId[]): Promise<void> {
//     try {
//       await this.dependencies.gameRepo.createGames(matchGames);
//     } catch (error) {
//       throw error;
//     }
//   }

//   private async createMatches(allMatches: Omit<MatchData, "id">[]): Promise<{
//     // createdMatches: Omit<MatchData, "ai_prediction" | "games">[];
//     predictionToCreate: PredictionWithId[];
//     gamesToCreate: GameWithId[];
//   }> {
//     try {
//       const matchesToCreate: Omit<
//         MatchData & { tier_id: number },
//         "id" | "ai_prediction" | "games"
//       >[] = [];
//       const gamesToCreate: GameWithSlug[] = [];
//       const predictionsToCreate: PredictionWithSlug[] = [];

//       const matchTournamentWithTEams =
//         await this.dependencies.matchWithTierAndTournament(allMatches, {
//           codeRepo: this.dependencies.codeRepo,
//           tournamentRepo: this.dependencies.touramentRepo,
//         });
//       for (const matchData of matchTournamentWithTEams) {
//         if (
//           matchData.ai_prediction.prediction_team1_score === undefined &&
//           matchData.ai_prediction.prediction_team2_score === undefined
//         ) {
//           console.log(
//             `match with slug: ${matchData.slug} no prediction so skip`
//           );
//           continue;
//         }

//         const { ai_prediction, games, ...metches } = matchData;

//         matchesToCreate.push(metches);
//         predictionsToCreate.push(ai_prediction);

//         if (games && games.length > 0) {
//           gamesToCreate.push(...games);
//         }
//       }

//       // const createdMatches = await this.dependencies.matchRepo.createMatch(
//       //   matchesToCreate
//       // );

//       const updatedPredictions = await matchPredictionWithMatches(
//         predictionsToCreate,
//         { matchesRepo: this.dependencies.matchRepo }
//       );

//       const updatedGames = await matchGamesWithMatches(gamesToCreate, {
//         matchesRepo: this.dependencies.matchRepo,
//       });

//       return {
//         predictionToCreate: updatedPredictions,
//         gamesToCreate: updatedGames,
//       };
//     } catch (error) {
//       throw error;
//     }
//   }
//   private async createTournaments(
//     tournamentsFromApi: Omit<TournamentDetails, "id">[]
//   ): Promise<TournamentDetails[]> {
//     try {
//       const createdTournaments =
//         await this.dependencies.touramentRepo.createTournaments(
//           tournamentsFromApi
//         );
//       return createdTournaments;
//     } catch (error) {
//       throw error;
//     }
//   }
// }
// export async function fillDataBasesService(
//   tournamentsFromApi: Omit<TournamentDetails, "id">[],
//   tierData: ITierData
// ): Promise<void> {
//   const dependencies: IDatabaseFillerDependencies = {
//     tierRepo: new TierRepository(),
//     touramentRepo: new TournamentRepository(),
//     matchRepo: new MatchRepository(),
//     gameRepo: new GameRepository(),
//     aiPredictionRepo: new AiPredictionRepository(),
//     codeRepo: new CodeRepository(Code),
//     tierMap: {},
//     matchWithTierAndTournament,
//     matchPredictionWithMatches,
//     matchGamesWithMatches,
//   };
//   const dataBaseFillerService = new TierDbFiller(dependencies);
//   await dataBaseFillerService.fillDataBases(tournamentsFromApi, tierData);
// }
