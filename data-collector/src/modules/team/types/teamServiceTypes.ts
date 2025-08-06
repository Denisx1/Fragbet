import { IAiPredictionRepository } from "../../aiPrediction/repository/interface";
import { ICountryRepository } from "../../country/repository/interface";
import { GridGotData } from "../../grid/gridService";
import { IRegionRepository } from "../../region/repository/interface";
import { IncomingMatch } from "../../upcomingMatches/fetches/mappers/mapperService";
import { IMatchRepository } from "../../upcomingMatches/repository/upcomingMatches";
import {
  MatchData,
  MatchWithSegregatedSlug,
} from "../../upcomingMatches/upcomingMatchService";
import { TeamFromPanda } from "../fetch/getTeamFromPanda";
import { ITeamRepository } from "../repository/interface";

import { TeamFromBO3, TeamFromBO3WithoutPlayers } from "./teamsTypes";

export interface TeamServiceFunctionDependencies {
  fetchTeamsFromBo3: (teamSlug: string) => Promise<TeamFromBO3>;
  teamStatService: (
    teamsSlugs: string[],
    newTeams: TeamFromBO3WithoutPlayers[]
  ) => Promise<void>;
  hasSegregatedSlug: (match: MatchData) => match is MatchWithSegregatedSlug;
  getTeamAndIdFromMatch: () => Promise<GridGotData[]>;
  delay: (ms: number) => Promise<void>;
  extractUniqueTeam: (slug: string) => string[];
  normalizeTeamName(name: string): string;
  fetchServicePanda(): Promise<IncomingMatch[]>;
  fetchTeamsFromPanda(ids: number[]): Promise<TeamFromPanda[]>;
}
export interface TeamServiceRepositoryDependencies {
  regionRepository: IRegionRepository;
  countryRepository: ICountryRepository;
  teamRepository: ITeamRepository;
  matchRepository: IMatchRepository;
  aiPredictionRepository: IAiPredictionRepository;
}
export type TeamServiceDependencies = TeamServiceFunctionDependencies &
  TeamServiceRepositoryDependencies;
