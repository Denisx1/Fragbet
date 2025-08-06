import { TeamFromBO3 } from "../../types/teamsTypes";

export interface FetchServiceTeamFromBo3Dependencies {
    teamFromBo3Map: (team: unknown) => TeamFromBO3;
    
  }