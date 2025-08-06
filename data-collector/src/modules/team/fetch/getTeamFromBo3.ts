import { TeamFromBO3 } from "../types/teamsTypes";
import { teamFromBo3Map } from "./mappers/teamFromBo3Map";
import { FetchServiceTeamFromBo3Dependencies } from "./types/bo3FetcherTypes";

export class FetchServiceTeamFromBo3 {
  constructor(private dependencies: FetchServiceTeamFromBo3Dependencies) {}

  async getTeams(teamSlug: string): Promise<TeamFromBO3> {
    try {
      const response = await fetch(
        process.env.GET_TEAM_FOR_UPCOMING_MATCH!.replace(
          "%TEAM_NAME%",
          teamSlug
        )
      );
      const data = await response.json()
      const mappedTeam = this.dependencies.teamFromBo3Map(data);
     
      return mappedTeam;
    } catch (error) {
      throw error;
    }
  }
}

export function fetchTeamsFromBo3(teamSlug: string) {
  const dependencies: FetchServiceTeamFromBo3Dependencies = {
    teamFromBo3Map,
  };
  const instance = new FetchServiceTeamFromBo3(dependencies);
  return instance.getTeams(teamSlug);
}
