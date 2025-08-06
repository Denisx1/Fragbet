import { TeamStats } from "../model/teamStatsModel";
import { TeamStatsCreationAttributes } from "../model/teamStatsModel";
import { ITeamStatsRepository } from "./interface";

export class TeamStatsRepository implements ITeamStatsRepository {
  async createTeamStats(
    teamStats: TeamStatsCreationAttributes[]
  ): Promise<void> {
    await TeamStats.bulkCreate(teamStats);
  }
}
