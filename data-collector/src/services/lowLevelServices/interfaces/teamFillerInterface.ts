// import { IAiPrediction } from "../../../interfaces/tierInterfaces";
// import { IPlayerDetails } from "../../../interfaces/playerInterfaces";
// import {
//   ICountyDetails,
//   IRegionDetails,
//   ITeamData,
// } from "../../../interfaces/teamInterfaces";
// import { MatchData } from "../../../interfaces/tierInterfaces";
// import { TeamCreationAttributes } from "../../../models/teamModels/teamModel";
// import { IPlayerRepository } from "../../../repository/playerRepository/interfaces/playerRepoIntefface";
// import { ICountryRepository } from "../../../repository/teamRepository/interfaces/countryRepositoryInterface";
// import { IRegionRepository } from "../../../repository/teamRepository/interfaces/regionRepositoryInterface";
// import { ITeamRepository } from "../../../repository/teamRepository/interfaces/teamRepositoryInterface";
// import { ITeamStatsRepository } from "../../../repository/teamRepository/interfaces/teamStatsRepositoryInterface";
// import { IAiPredictionRepository } from "../../../repository/tierRepository/interfaces/aiPredictionRepositoryInterface";
// import { IMatchRepository } from "../../../repository/tierRepository/interfaces/matchRepositoryInterface";
// import { PredictionWithId } from "../../utils/tierUtils";
// import { IUtilsDependencies } from "./tierFillerInterface";

// export interface IUtilsTEamDependencies {
//   regionRepo: IRegionRepository;
// }

// export interface ITeamFillerDependencies {
//   teamRepo: ITeamRepository;
//   teamStatRepo: ITeamStatsRepository;
//   regionRepo: IRegionRepository;
//   countryRepo: ICountryRepository;
//   matchRepo: IMatchRepository;
//   aiPredictionRepo: IAiPredictionRepository;
//   playerRepo: IPlayerRepository
//   countryToRegionMap: { [key: string]: string };
//   compareRegionCountry: (
//     country: ICountyDetails[],
//     dependency: IUtilsTEamDependencies
//   ) => Promise<ICountyDetails[]>;
//   matchTeamAndCountry: (
//     teams: Omit<ITeamData, "players" | "id">[],
//     countries: ICountyDetails[]
//   ) => Omit<ITeamData, "players" | "country" | "id">[];
//   updateMatch: (
//     matchesFromDb: Omit<MatchData & { tier_id: number }, "ai_prediction" | "games">[],
//     teamFromDb: { slug: string; id: number }[],
//     predictionsFromDb: PredictionWithId[]
//   ) => {
//     updatedMatches: Omit<MatchData & { tier_id: number }, "ai_prediction" | "games">[];
//     updatedPredictions: Omit<IAiPrediction, "match_slug">[];
//   };
// }
