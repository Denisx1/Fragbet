// import {
//   IPlayerDetails,
//   IPlayerMatchDetails,
//   IPlayerStatsForEveryMatch,
// } from "../../interfaces/playerInterfaces";
// import { ITeamData } from "../../interfaces/teamInterfaces";
// import { Tournament } from "../../models";

// import { PlayerMatchRepository } from "../../repository/playerRepository/playerMatchRepositoey";
// import { PlayerRepository } from "../../repository/playerRepository/playerRepository";
// import { PlayerStatsRepository } from "../../repository/playerRepository/playerStatsRepository";
// import { TeamRepository } from "../../repository/teamRepository/teamRepository";
// import { TournamentRepository } from "../../repository/tierRepository/tournamentReository";
// import {
//   averageStatsByPlayer,
//   combinePlayersWithMatches,
//   separatePlayerMatchData,
//   TFullMatch,
// } from "../utils/playerUtils";

// import {
//   IPlayerFillerDependencies,
//   TMatchWithoutFields,
// } from "./interfaces/playerFillerInterface";

// class PlayerDbFiller {
//   constructor(private dependencies: IPlayerFillerDependencies) {}
//   async fillPlayers(
//     players: Omit<
//       IPlayerDetails & {
//         isTeamStub: boolean;
//       },
//       "id" | "matches"
//     >[],
//     playersMatches: Omit<IPlayerMatchDetails, "stats">[],
//     playerStats: IPlayerStatsForEveryMatch[]
//   ) {
//     try {
//       if (players.length > 0) {
//         await this.dependencies.playerRepo.createPlayer(players);
//       }
//       const [playerMatchesToCreate, playerStatsToCreate] = await Promise.all([
//         this.createMatchesForPlayers(playersMatches),
//         this.createStatForPlayerMatch(playerStats),
//       ]);
//       const chunks = this.dependencies.separatePlayerMatchData(
//         playerMatchesToCreate
//       );
//       for (const chunk of chunks) {
//         await this.dependencies.playerMatchRepo.createPlayerMatch(chunk);
//       }
//       await this.dependencies.playerStatRepo.createPlayerStats(
//         playerStatsToCreate
//       );
//     } catch (error) {
//       throw error;
//     }
//   }
//   private async createStatForPlayerMatch(
//     playerStats: IPlayerStatsForEveryMatch[]
//   ) {
//     try {
//       const statsToInsert: (IPlayerStatsForEveryMatch & {
//         player_id: number;
//       })[] = [];
//       const avaragePlayerStats =
//         this.dependencies.averageStatsByPlayer(playerStats);

//       for (const playerStat of avaragePlayerStats) {
//         const player = await this.dependencies.playerRepo.getPlayerBySlug(
//           playerStat.player_slug
//         );
//         if (!player) {
//           console.log(`player with slug: ${playerStat.player_slug} is absent`);
//           continue;
//         }
//         statsToInsert.push({
//           ...playerStat,
//           player_id: player.id ?? 0,
//         });
//       }
//       return statsToInsert;
//     } catch (error) {
//       throw error;
//     }
//   }
//   private async getPlayerMatches(
//     player_match_id: number
//   ): Promise<Omit<IPlayerMatchDetails, "stats"> | null> {
//     const playerMatch =
//       await this.dependencies.playerMatchRepo.getPlayerMatchById(
//         player_match_id
//       );
//     return playerMatch || null;
//   }
//   private async getTeam(
//     slug: string
//   ): Promise<Omit<ITeamData, "players" | "country"> | null> {
//     const team = await this.dependencies.teamRepo.getTeamBySlug(slug);
//     if (!team) {
//       return null;
//     }
//     return team;
//   }
//   private async getTournament(slug: string): Promise<Tournament | null> {
//     const tournament = await this.dependencies.tournamentRepo.findBySlug(slug);
//     if (!tournament) {
//       return null;
//     }
//     return tournament;
//   }
//   private async getPlayer(
//     slug: string
//   ): Promise<Omit<IPlayerDetails, "matches"> | null> {
//     const player = await this.dependencies.playerRepo.getPlayerBySlug(slug);
//     if (!player) {
//       return null;
//     }
//     return player;
//   }
//   private async createMatchesForPlayers(
//     playersMatches: Omit<IPlayerMatchDetails, "stats">[]
//   ): Promise<TFullMatch[]> {
//     try {
//       const matchPromises = playersMatches.map(async (match) => {
//         const [team, enemyTeam, player, tournament] = await Promise.all([
//           this.getTeam(match.team_slug),
//           this.getTeam(match.enemy_team_slug),
//           this.getPlayer(match.player_slug),
//           this.getTournament(match.tournament_slug),
//         ]);
//         if (!team || !enemyTeam || !player || !tournament) {
//           return null;
//         }

//         return this.dependencies.combinePlayersWithMatches(
//           match,
//           team,
//           enemyTeam,
//           player,
//           tournament
//         );
//       });
//       const results = await Promise.all(matchPromises);
//       return results.filter((match): match is TFullMatch => match !== null);
//     } catch (error) {
//       throw error;
//     }
//   }
// }
// export async function fillPlayersWithData(
//   players: Omit<
//     IPlayerDetails & {
//       isTeamStub: boolean;
//     },
//     "id" | "matches"
//   >[],
//   playersMatches: Omit<IPlayerMatchDetails, "stats">[],
//   playerStats: IPlayerStatsForEveryMatch[]
// ): Promise<void> {
//   const dependencies: IPlayerFillerDependencies = {
//     playerRepo: new PlayerRepository(),
//     playerMatchRepo: new PlayerMatchRepository(),
//     playerStatRepo: new PlayerStatsRepository(),
//     teamRepo: new TeamRepository(),
//     tournamentRepo: new TournamentRepository(),
//     combinePlayersWithMatches,
//     separatePlayerMatchData,
//     averageStatsByPlayer,
//   };
//   const filler = new PlayerDbFiller(dependencies);
//   await filler.fillPlayers(players, playersMatches, playerStats);
// }
