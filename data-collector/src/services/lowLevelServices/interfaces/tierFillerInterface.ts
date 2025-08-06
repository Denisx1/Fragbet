import { MatchData } from "../../../interfaces/tierInterfaces";
import { ITeamRepository } from "../../../repository/teamRepository/interfaces/teamRepositoryInterface";
import { IAiPredictionRepository } from "../../../repository/tierRepository/interfaces/aiPredictionRepositoryInterface";
import { ICodeRepository } from "../../../repository/tierRepository/interfaces/codeInterfaces";
import { IGameRepository } from "../../../repository/tierRepository/interfaces/gameRepositoryInterface";
import { IMatchRepository } from "../../../repository/tierRepository/interfaces/matchRepositoryInterface";
import { ITierRepository } from "../../../repository/tierRepository/interfaces/tierRepositoryInterface";
import { ITournamentRepository } from "../../../repository/tierRepository/interfaces/tournamentRepositoryInterface";
import {
  GameWithId,
  GameWithSlug,
  PredictionWithId,
  PredictionWithSlug,
} from "../../utils/tierUtils";

export interface IUtilsDependencies {
  codeRepo?: ICodeRepository;
  tournamentRepo?: ITournamentRepository;
  matchesRepo?: IMatchRepository;
  teamRepo?: ITeamRepository;
}
export interface IDatabaseFillerDependencies {
  tierRepo: ITierRepository;
  touramentRepo: ITournamentRepository;
  matchRepo: IMatchRepository;
  gameRepo: IGameRepository;
  aiPredictionRepo: IAiPredictionRepository;
  codeRepo: ICodeRepository;
  tierMap: Record<string, number>;
  matchWithTierAndTournament: (
    allMatches: Omit<MatchData, "id">[],
    dependencies: IUtilsDependencies
  ) => Promise<Omit<MatchData & { tier_id: number }, "id">[]>;
  matchPredictionWithMatches: (
    predictionsToCreate: Omit<PredictionWithSlug, "match_id">[],
    dependencies: IUtilsDependencies
  ) => Promise<PredictionWithId[]>;
  matchGamesWithMatches: (
    gamesToCreate: Omit<GameWithSlug, "match_id">[],
    dependencies: IUtilsDependencies
  ) => Promise<GameWithId[]>;
}
