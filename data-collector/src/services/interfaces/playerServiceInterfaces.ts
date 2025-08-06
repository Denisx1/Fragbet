import { IFetchHandler } from "../../fetch/interfaces/fetchHandlerInterface";
import {
  IPlayerDetails,
  IPlayerMatchDetails,
  IPlayerStatsForEveryMatch,
} from "../../interfaces/playerInterfaces";
import { ITeamData } from "../../interfaces/teamInterfaces";
import { Tournament } from "../../models";
import { IPlayerMatchRepository } from "../../repository/playerRepository/interfaces/layerMatchRepoInterface";
import { IPlayerRepository } from "../../repository/playerRepository/interfaces/playerRepoIntefface";
import { IPlayerStatsRepository } from "../../repository/playerRepository/interfaces/playerStatRepoInterface";
import { ITeamRepository } from "../../repository/teamRepository/interfaces/teamRepositoryInterface";
import { ITournamentRepository } from "../../repository/tierRepository/interfaces/tournamentRepositoryInterface";
import { TFullMatch } from "../utils/playerUtils";

export interface IPlayerServiceDependencies {
  fetchHandler: IFetchHandler;
  teamRepo: ITeamRepository;
  playerRepo: IPlayerRepository;
  playerMatchRepo: IPlayerMatchRepository;
  playerStatRepo: IPlayerStatsRepository;
  tournamentRepo: ITournamentRepository;
  splitPlayerData: (playerInfoArrays: Omit<IPlayerDetails, "id">[]) => {
    players: Omit<IPlayerDetails, "id" | "matches">[];
    playersMatches: Omit<IPlayerMatchDetails, "stats">[];
    playerStats: IPlayerStatsForEveryMatch[];
  };
  fillPlayersWithData(
    players: Omit<
      IPlayerDetails & {
        isTeamStub: boolean;
      },
      "id" | "matches"
    >[],
    playersMatches: Omit<IPlayerMatchDetails, "stats">[],
    playerStats: IPlayerStatsForEveryMatch[]
  ): Promise<void>;
  combineTEamWithPlayers: (
    players: Omit<IPlayerDetails, "id" | "matches">[],
    teams: { slug: string; id: number }[]
  ) => {
    players: Omit<IPlayerDetails, "matches" | "id">[];
    unknownPlayers: string[];
    unknownTeams: string[];
  };
  filterPlayerMatches: (
    playerMatchesData: Omit<IPlayerMatchDetails, "stats">[],
    playerSlugs: string[]
  ) => Omit<IPlayerMatchDetails, "stats">[];

  delay(ms: number): Promise<void>;
}
