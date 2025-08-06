
// import {
//   ICountyDetails,
//   IRegionDetails,
//   ITeamData,
//   ITeamStat,
// } from "../interfaces/teamInterfaces";

// import {
//   IPersedTeam,
//   ITeamServiceDependencies,
// } from "./interfaces/teamServiceInterfaces";
// import { teamDbFiller } from "./lowLevelServices/teamDbFiller";
// import { getUniqueData } from "./utils/teamUtils";
// import { delay } from "./utils/tierUtils";
// class TeamService {
//   constructor(private readonly dependencies: ITeamServiceDependencies) {}

//   async uploadTeamData(slugs: string[]): Promise<string[]> {
//     try {
//       const { teams, players, country, regions, teamStats } = await this.getTeamBySlug(
//         slugs
//       );
//       const { uniqueCountries, uniqueRegions } = this.filterData(
//         country,
//         regions
//       );

//       await this.dependencies.teamDbFiller(
//         players,
//         teams,
//         uniqueCountries,
//         uniqueRegions,
//         teamStats
//       );

//       return players;
//     } catch (error) {
//       throw error;
//     }
//   }

//   private async getTeamBySlug(slugs: string[]): Promise<IPersedTeam> {
//     try {
//       const teams: Omit<ITeamData, "players" | "id" | "country_id">[] = [];
//       const playersSlugs: string[][] = [];
//       const countryData: Omit<ICountyDetails, "region">[] = [];
//       const regions: IRegionDetails[] = [];
//       const teamStats: Omit<ITeamStat, "id">[][] = [];
//       for (const slug of slugs) {
//         const teamData = await this.dependencies.fetchHandler.getTeam(slug);
//         const teamStat = await this.dependencies.fetchHandler.getTeamsStats(slug);
//         if (!teamStat) {
//           console.log(`TeamStat with this slug: ${slug} is absent`);
//           continue; // Пропускаем текущую итерацию цикла, если команды нет
//         }
//         // Проверяем, что команда существует (не равна null)
//         if (!teamData || !teamData.team) {
//           console.log(`Team with this slug: ${slug} is absent`);
//           continue; // Пропускаем текущую итерацию цикла, если команды нет
//         }

//         const { players, country, region, team } = teamData;

//         if (!team) {
//           console.log(`team with this slug: ${slug} is absent`);
//           continue;
//         }
//         teams.push(team);
//         playersSlugs.push(players);
//         countryData.push(country);
//         regions.push(region);

//         teamStats.push(teamStat);

//         await delay(40);
//       }

//       return {
//         teams,
//         players: playersSlugs.flat(),
//         country: countryData,
//         regions,
//         teamStats: teamStats.flat(),
//       };
//     } catch (error) {
//       throw error;
//     }
//   }
//   private filterData(
//     country: ICountyDetails[],
//     region: IRegionDetails[]
//   ): { uniqueCountries: ICountyDetails[]; uniqueRegions: IRegionDetails[] } {
//     const { uniqueCountries, uniqueRegions } = getUniqueData(country, region);
//     return { uniqueCountries, uniqueRegions };
//   }
// }

// export async function uploadTeamData(slugs: string[]) {
//   const dependency: ITeamServiceDependencies = {
//     fetchHandler: new FetchHandler(),
//     teamDbFiller,
//     getUniqueData,
//   };
//   const teamService = new TeamService(dependency);
//   return await teamService.uploadTeamData(slugs);
// }
