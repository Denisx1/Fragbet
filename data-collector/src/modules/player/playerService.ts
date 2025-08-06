import { IPlayerMatchRepository } from "../player`sMatches/repository/interface";
import { PlayerMatchRepository } from "../player`sMatches/repository/player`sMathesRepository";
import { IPlayerStatsRepository } from "../player`sMatchStats/repository/interface";
import { PlayerStatsRepository } from "../player`sMatchStats/repository/player`sMatchStatRepository";
import { delay } from "../team/utils/utils";
import { fetchPlayerFromBo3 } from "./fetch/getPlayer";
import { IPlayerRepository } from "./repository/interface";
import { PlayerRepository } from "./repository/playerRepository";

interface PlayerServiceFubctionDependencies {
  fetchPlayerFromBo3: (playerSlug: string) => Promise<void>;
  delay: (ms: number) => Promise<void>;
}
interface PlayerServiceRepositoryDependencies {
  playerRepository: IPlayerRepository;
  playerStatRepository: IPlayerStatsRepository;
  playersMatchStatsRepository: IPlayerMatchRepository;
}

class PlayerService {
  constructor(
    private funcDependencies: PlayerServiceFubctionDependencies,
    private repoDependencies: PlayerServiceRepositoryDependencies
  ) {}
  async hadlePlayers(playersSlugs: string[]) {
    try {
      await this.getPlayersFromDB(playersSlugs);
    } catch (error) {
      throw error;
    }
  }
  private async getPlayersFromDB(playersSlugs: string[]) {
    try {
        const playerInfo: any[] = []
      for (const playerSlug of playersSlugs) {
        const player = await this.funcDependencies.fetchPlayerFromBo3(
          playerSlug
        );
        playerInfo.push(player)
      }
      return;
    } catch (error) {
      throw error;
    }
  }
}

export function handlePlayerService(playersSlugs: string[]) {
  const funcDependencies: PlayerServiceFubctionDependencies = {
    fetchPlayerFromBo3,
    delay,
  };
  const repoDependencies: PlayerServiceRepositoryDependencies = {
    playerRepository: new PlayerRepository(),
    playerStatRepository: new PlayerStatsRepository(),
    playersMatchStatsRepository: new PlayerMatchRepository(),
  };
  const instance = new PlayerService(funcDependencies, repoDependencies);
  return instance.hadlePlayers(playersSlugs);
}
