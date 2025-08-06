import { TeamFromBO3WithoutPlayers } from "../team/types/teamsTypes";
import { teamStatGetter } from "./fetch/getTeamStat";
import { TeamStatsCreationAttributes } from "./model/teamStatsModel";
import { ITeamStatsRepository } from "./repository/interface";
import { TeamStatsRepository } from "./repository/teamStatsRepo";

interface TeamStatServiceDependencies {
  teamStatGetter: (
    teamsSlugs: string[]
  ) => Promise<TeamStatsCreationAttributes[]>;
  teamStatsRepo: ITeamStatsRepository;
}

class TeamStatService {
  constructor(private dependencies: TeamStatServiceDependencies) {}
  async createTeamStats(
    teamsSlugs: string[],
    newTeams: TeamFromBO3WithoutPlayers[]
  ): Promise<void> {
    try {
      const teamStats = await this.dependencies.teamStatGetter(teamsSlugs);
      await this.createTeamStat(teamStats, newTeams);
    } catch (error) {
      throw error;
    }
  }
  private async createTeamStat(
    teamStats: TeamStatsCreationAttributes[],
    newTeams: TeamFromBO3WithoutPlayers[]
  ) {
    try {
      const teamMap = new Map<string, number>(
        newTeams.map((team) => [team.slug, team.id!])
      );

      const teamStatsWithId: TeamStatsCreationAttributes[] = teamStats.map(
        (stat) => ({
          ...stat,
          team_id: teamMap.get(stat.team_slug)!,
        })
      );

      await this.dependencies.teamStatsRepo.createTeamStats(teamStatsWithId);
      return teamStatsWithId;
    } catch (error) {
      throw error;
    }
  }
}

export function teamStatService(
  teamsSlugs: string[],
  newTeams: TeamFromBO3WithoutPlayers[]
): Promise<void> {
  const dependencies: TeamStatServiceDependencies = {
    teamStatGetter,
    teamStatsRepo: new TeamStatsRepository(),
  };
  const teamStatService = new TeamStatService(dependencies);
  return teamStatService.createTeamStats(teamsSlugs, newTeams);
}
