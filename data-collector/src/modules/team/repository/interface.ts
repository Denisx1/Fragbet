import { Team, TeamCreationAttributes } from "../model/team.model";
import { TeamFromBO3WithoutPlayers } from "../types/teamsTypes";


export interface ITeamRepository {
  createTeam(team: TeamCreationAttributes[]): Promise<TeamFromBO3WithoutPlayers[]>;
  getTeams(): Promise<Team[]>;
  getTeamBySlug(slug: string): Promise<Team | null>;
}
