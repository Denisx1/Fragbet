import { TeamStatsCreationAttributes } from "../model/teamStatsModel";

export interface ITeamStatsRepository {
  createTeamStats(teamStats: TeamStatsCreationAttributes[]): Promise<void>;
}
