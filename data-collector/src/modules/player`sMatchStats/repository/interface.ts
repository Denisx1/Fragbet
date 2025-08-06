import {
  PlayerStats,
  PlayerStatsCreationAttributes,
} from "../model/players`sMatchStats";

export interface IPlayerStatsRepository {
  createPlayerStats(
    playerStats: PlayerStatsCreationAttributes[]
  ): Promise<PlayerStats[]>;
}
