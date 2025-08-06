import {
  PlayerStats,
  PlayerStatsCreationAttributes,
} from "../model/players`sMatchStats";

export class PlayerStatsRepository {
  async createPlayerStats(
    playerStats: PlayerStatsCreationAttributes[]
  ): Promise<PlayerStats[]> {
    try {
      const newPlayerStats = await PlayerStats.bulkCreate(playerStats);
      return newPlayerStats;
    } catch (error) {
      throw error;
    }
  }
}
