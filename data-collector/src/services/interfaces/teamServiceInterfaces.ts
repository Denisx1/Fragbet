import { IFetchHandler } from "../../fetch/interfaces/fetchHandlerInterface";
import {
  ICountyDetails,
  IRegionDetails,
  ITeamData,
  ITeamStat,
} from "../../interfaces/teamInterfaces";

export interface ITeamServiceDependencies {
  fetchHandler: IFetchHandler;
  teamDbFiller: (
    players: string[],
    teams: Omit<ITeamData, "players" | "id" | "country_id">[],
    countries: Omit<ICountyDetails, "region">[],
    regions: IRegionDetails[],
    teamStats: Omit<ITeamStat, "id">[]
  ) => Promise<string[]>;
  getUniqueData(
    country: ICountyDetails[],
    region: IRegionDetails[]
  ): { uniqueRegions: IRegionDetails[]; uniqueCountries: ICountyDetails[] };
}

export interface IPersedTeam {
  teams: Omit<ITeamData, "players" | "id" | "country_id">[];
  players: string[];
  country: ICountyDetails[];
  regions: IRegionDetails[];
  teamStats: Omit<ITeamStat, "id">[];
}
