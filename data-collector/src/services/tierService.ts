// import { TournamentDetails } from "../interfaces/tierInterfaces";
// import { fillDataBasesService } from "./lowLevelServices/tierDbFiller";
// import { FetchHandler } from "../fetch/fetchHandler";
// import { extractTeamName } from './utils/tierUtils';

// import {
//   ITierData,
//   ITierServiceDependencies,
// } from "./interfaces/tearServiceInterface";

// class TierService {
//   constructor(private dependencies: ITierServiceDependencies) {}
//   async uploadTierData(): Promise<string[]> {
//     try {
//       const teamsSlug: string[] = [];
//       const tierData = await this.fetchTierData();
//       const tournamentDetails = await this.getTournamentDetails();
//       const createdMatches = await this.dependencies.fillDataBasesService(
//         tournamentDetails,
//         tierData
//       );

//       for (const match of createdMatches) {
//         const [team1, team2] = extractTeamName(match.slug);
//         teamsSlug.push(team1);
//         teamsSlug.push(team2);
//       }
//       return teamsSlug;
//     } catch (error) {
//       throw error;
//     }
//   }

//   private async getTournamentDetails():  Promise<Omit<TournamentDetails, "id">[]>{
//     try {
//       const tournamentDetails =
//         await this.dependencies.fetchService.getTournaments();

//       return tournamentDetails;
//     } catch (error) {
//       throw error;
//     }
//   }

//   private async fetchTierData(): Promise<ITierData> {
//     try {
//       const tierData = await this.dependencies.fetchService.getTodayTiers();
      
//       return tierData;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// export async function uploadTierData(): Promise<string[]> {
//   const dependencies: ITierServiceDependencies = {
//     fetchService: new FetchHandler(),
  
//     extractTeamName
//   };
//   const tierService = new TierService(dependencies);
//   return await tierService.uploadTierData();
// }
