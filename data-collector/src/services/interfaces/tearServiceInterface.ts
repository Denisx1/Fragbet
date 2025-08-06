import { IFetchHandler } from "../../fetch/interfaces/fetchHandlerInterface";
import { MatchData, TournamentDetails } from "../../interfaces/tierInterfaces";
import { MatchCreationAttributes } from "../../models/tierModels/match";

export interface ITierServiceDependencies {
  fetchService: IFetchHandler;
  fillDataBasesService: (
    tournamentsFromApi:  Omit<TournamentDetails, "id">[],
    allMatches: ITierData
  ) => Promise<Omit<MatchData, "ai_prediction" | "games">[]>;
  extractTeamName:(slug: string)=> [string, string]
}
export interface ITierData {
  matches: Omit<MatchData, "id">[];
  highTierCodes: string[];
  lowTierCodes: string[];
}
