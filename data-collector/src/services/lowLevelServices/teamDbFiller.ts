// import {
//   ICountyDetails,
//   IRegionDetails,
//   ITeamData,
//   ITeamStat,
// } from "../../interfaces/teamInterfaces";
// import { CountryCreationAttributes } from "../../models/teamModels/countryModel";

// import { PlayerRepository } from "../../repository/playerRepository/playerRepository";
// import { CountryRepository } from "../../repository/teamRepository/countryRepository";
// import { RegionRepository } from "../../repository/teamRepository/regionRepository";
// import { TeamRepository } from "../../repository/teamRepository/teamRepository";
// import { TeamStatsRepository } from "../../repository/teamRepository/teamStatsRepository";
// import { AiPredictionRepository } from "../../repository/tierRepository/aiPredictionRepository";
// import { MatchRepository } from "../../repository/tierRepository/matchRepository";
// import { countryToRegionMap } from "../utils/mappps";
// import { compareRegionCountry, matchTeamAndCountry } from "../utils/teamUtils";
// import { updateMatch } from "../utils/tierUtils";
// import { ITeamFillerDependencies } from "./interfaces/teamFillerInterface";

// class TeamDbFiller {
//   constructor(private dependencies: ITeamFillerDependencies) {}

//   async fillDataBases(
//     players: string[],
//     teams: Omit<ITeamData, "players" | "id" | "country_id">[],
//     countries: Omit<ICountyDetails, "region">[],
//     regions: IRegionDetails[],
//     teamStats: Omit<ITeamStat, "id">[]
//   ): Promise<string[]> {
//     try {
//       const newRegions = await this.createRegion(regions);
//       const countriesWithRegion = await this.compareRegionCountry(countries);
//       const newCountries = await this.createCountry(countriesWithRegion);
//       await this.createTeam(teams, newCountries);
//       await this.updateMatchPrediction();
//       const teamStatsWithId = await this.createTeamStat(teamStats);
//       await this.dependencies.teamStatRepo.createTeamStats(teamStatsWithId);
//       return players;
//     } catch (error) {
//       throw error;
//     }
//   }
//   private async createTeamStat(
//     teamStats: Omit<ITeamStat, "id">[]
//   ): Promise<Omit<ITeamStat & { team_id: number }, "id">[]> {
//     try {
//       const team = await this.dependencies.teamRepo.getTeams();
//       const teamMap = new Map<string, number>(team.map((t) => [t.slug, t.id]));
//       const teamStatsWithId: Omit<ITeamStat & { team_id: number }, "id">[] =
//         teamStats.map((stat) => ({
//           ...stat,
//           team_id: teamMap.get(stat.team_slug)!,
//         }));
//       return teamStatsWithId;
//     } catch (error) {
//       throw error;
//     }
//   }

//   private async updateMatchPrediction() {
//     try {
//       const [matchesFromDb, teamFromDb, predictionsFromDb] = await Promise.all([
//         this.dependencies.matchRepo.getAllMatches(),
//         this.dependencies.teamRepo.getTeams(),
//         this.dependencies.aiPredictionRepo.getPrediction(),
//       ]);
//       const { updatedMatches, updatedPredictions } =
//         this.dependencies.updateMatch(
//           matchesFromDb,
//           teamFromDb,
//           predictionsFromDb
//         );
//       await Promise.all([
//         this.dependencies.matchRepo.bulkUpdateMatches(updatedMatches),
//         this.dependencies.aiPredictionRepo.bulkUpdatePredictions(
//           updatedPredictions
//         ),
//       ]);
//     } catch (error) {
//       throw error;
//     }
//   }

//   private async createTeam(
//     teams: Omit<ITeamData, "players" | "id" | "country_id">[],
//     countries: ICountyDetails[]
//   ): Promise<void> {
//     try {
//       const getMatchedTEam = this.dependencies.matchTeamAndCountry(
//         teams,
//         countries
//       );
//       const uniqueTeams = Array.from(
//         new Map(getMatchedTEam.map((team) => [team.slug, team])).values()
//       );
//       await this.dependencies.teamRepo.createTeam(uniqueTeams);
//     } catch (error) {
//       throw error;
//     }
//   }
//   private async compareRegionCountry(
//     countries: ICountyDetails[]
//   ): Promise<CountryCreationAttributes[]> {
//     const getCountryWithRegionId = await compareRegionCountry(countries, {
//       regionRepo: this.dependencies.regionRepo,
//     });
//     return getCountryWithRegionId;
//   }

//   private async createCountry(
//     countries: CountryCreationAttributes[]
//   ): Promise<CountryCreationAttributes[]> {
//     try {
//       const createdCountries =
//         await this.dependencies.countryRepo.createCountry(countries);
//       return createdCountries.map((country) => country.get({ plain: true }));
//     } catch (error) {
//       throw error;
//     }
//   }
//   private async createRegion(
//     regions: IRegionDetails[]
//   ): Promise<IRegionDetails[]> {
//     try {
//       const doesRegionExist =
//         await this.dependencies.regionRepo.findAllRegions();

//       const existingSlugs = new Set(
//         doesRegionExist.map((region) => region.slug)
//       );

//       // Фильтруем новые регионы, оставляя только те, которых нет в базе
//       const newRegions = regions.filter(
//         (region) => !existingSlugs.has(region.slug)
//       );
//       if (newRegions.length > 0) {
//         return await this.dependencies.regionRepo.createRegion(newRegions);
//       }
//       return [];
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// export async function teamDbFiller(
//   players: string[],
//   teams: Omit<ITeamData, "players" | "id" | "country_id">[],
//   countries: Omit<ICountyDetails, "region">[],
//   regions: IRegionDetails[],
//   teamStats: Omit<ITeamStat, "id">[]
// ): Promise<string[]> {
//   const dependencies: ITeamFillerDependencies = {
//     teamRepo: new TeamRepository(),
//     teamStatRepo: new TeamStatsRepository(),
//     regionRepo: new RegionRepository(),
//     countryRepo: new CountryRepository(),
//     matchRepo: new MatchRepository(),
//     aiPredictionRepo: new AiPredictionRepository(),
//     playerRepo: new PlayerRepository(),
//     countryToRegionMap,
//     compareRegionCountry,
//     matchTeamAndCountry,
//     updateMatch,
//   };
//   const teamDbFiller = new TeamDbFiller(dependencies);
//   return await teamDbFiller.fillDataBases(
//     players,
//     teams,
//     countries,
//     regions,
//     teamStats
//   );
// }
