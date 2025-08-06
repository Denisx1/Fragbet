// import { FetchHandler } from "../fetch/fetchHandler";
// import {
//   IPlayerDetails,
//   IPlayerMatchDetails,
// } from "../interfaces/playerInterfaces";
// import { PlayerMatchRepository } from "../repository/playerRepository/playerMatchRepositoey";
// import { PlayerRepository } from "../repository/playerRepository/playerRepository";
// import { PlayerStatsRepository } from "../repository/playerRepository/playerStatsRepository";
// import { TeamRepository } from "../repository/teamRepository/teamRepository";
// import { TournamentRepository } from "../repository/tierRepository/tournamentReository";

// import { IPlayerServiceDependencies } from "./interfaces/playerServiceInterfaces";
// import { fillPlayersWithData } from "./lowLevelServices/playerDbFiller";
// import {
//   combinePlayersWithMatches,
//   combineTEamWithPlayers,
//   filterPlayerMatches,
//   splitPlayerData,
//   TFullMatch,
// } from "./utils/playerUtils";
// import { delay } from "./utils/tierUtils";

// class PlayerService {
//   constructor(private readonly dependencies: IPlayerServiceDependencies) {}

//   async uploadPlayers(playerSlugs: string[]) {
//     try {
//       const missingSlugs = await this.checkPlayersSlug(playerSlugs);

//       const getInfo = await this.getPlayersInfo(missingSlugs);

//       const allPlayers = this.chaeckValidPlayers(getInfo, missingSlugs);

//       const { players, playersMatches, playerStats } =
//         this.dependencies.splitPlayerData(allPlayers);
//       const getPlayerWithId = await this.attachteamIdToPlayer(players);
//       await this.dependencies.fillPlayersWithData(
//         getPlayerWithId,
//         playersMatches,
//         playerStats
//       );
//     } catch (error) {
//       throw error;
//     }
//   }
//   private chaeckValidPlayers(
//     players: Omit<IPlayerDetails, "id">[],
//     missingSlugs: string[]
//   ): Omit<IPlayerDetails, "id">[] {
//     const notReturned = missingSlugs.filter(
//       (slug) => !players.find((p) => p.player_slug === slug)
//     );
//     console.log(`❌ Не найдены игроки в API: ${notReturned.length}`);
//     if (notReturned.length > 0) {
//       console.log("Неизвестные игроки:", notReturned);
//     }
//     const placeHolderPlayers = notReturned.map((slug: string) => ({
//       player_slug: slug,
//       player_nickname: slug,
//       player_image_url: "",
//       team_name: "",
//       team_slug: "",
//       team_image_url: "",
//       team_id: null,
//       matches: [],
//     }));
//     const allPlayers = [...players, ...placeHolderPlayers];
//     return allPlayers;
//   }

//   private async checkPlayersSlug(slugs: string[]): Promise<string[]> {
//     try {
//       const existingSlugs = await this.dependencies.playerRepo.getAllSlugs(
//         slugs
//       );
//       const missingSlugs = slugs.filter(
//         (slug) => !existingSlugs.includes(slug)
//       );

//       if (missingSlugs.length === 0) {
//         console.log(`✅ All ${slugs.length} players are in the database.`);
//       } else {
//         // Иначе выводим, кто отсутствует
//         console.log(`❌ Found ${missingSlugs.length} missing players:`);
//         missingSlugs.forEach((slug) => {
//           console.log(`  - ${slug}`);
//         });
//       }

//       // 4. Выводим по каждому отсутствующему игроку
//       if (missingSlugs.length > 0) {
//         missingSlugs.forEach((slug) => {
//           console.log(`Player with slug "${slug}" is ready to create.`);
//         });
//       }
//       return missingSlugs;
//     } catch (error) {
//       throw error;
//     }
//   }

//   private async attachteamIdToPlayer(
//     players: Omit<IPlayerDetails, "id" | "matches">[]
//   ): Promise<
//     Omit<IPlayerDetails & { isTeamStub: boolean }, "id" | "matches">[]
//   > {
//     try {
//       const existingTeams = await this.dependencies.teamRepo.getTeams();
//       const teamSlugMap = new Map<string, number>(
//         existingTeams.map((team) => [team.slug, team.id])
//       );

//       const playersWithTeamIds = players.map((player) => {
//         const teamId = teamSlugMap.get(player.team_slug); // Ищем команду по slug

//         // Если команда найдена, добавляем team_id
//         if (teamId) {
//           return {
//             ...player,
//             team_id: teamId, // Присваиваем team_id игроку
//             isTeamStub: false,
//           };
//         }

//         // Если команда не найдена, можно либо пропустить игрока, либо установить default value (например, null)
//         return {
//           ...player,
//           team_id: teamId ?? null,
//           isTeamStub: true, // Или можно создать команду с id = 0, если игрок не найден
//         };
//       });

//       return playersWithTeamIds;
//     } catch (error) {
//       throw error;
//     }
//   }

//   private async getPlayersInfo(
//     playerSlugs: string[]
//   ): Promise<Omit<IPlayerDetails, "id">[]> {
//     try {
//       const playersInfo: Omit<IPlayerDetails, "id">[][] = [];
//       for (const playerSlug of playerSlugs) {
//         const response = await this.dependencies.fetchHandler.getPlayerInfo(
//           playerSlug
//         );
//         playersInfo.push(response);
//         await this.dependencies.delay(40);
//       }
//       return playersInfo.flat();
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// export async function uploadPlayers(playerSlugs: string[]) {
//   const dependency: IPlayerServiceDependencies = {
//     fetchHandler: new FetchHandler(),
//     teamRepo: new TeamRepository(),
//     playerRepo: new PlayerRepository(),
//     playerMatchRepo: new PlayerMatchRepository(),
//     playerStatRepo: new PlayerStatsRepository(),
//     tournamentRepo: new TournamentRepository(),
//     splitPlayerData,
//     fillPlayersWithData,
//     combineTEamWithPlayers,
//     filterPlayerMatches,
//     delay,
//   };
//   const playerService = new PlayerService(dependency);
//   await playerService.uploadPlayers(playerSlugs);
// }
