import type { IAiPrediction } from "./aiPrediction";
import type { ITeamParticipant } from "./team";
import type { IUpcomingGame } from "./upcomingGames";

export interface IUpcomingMatch {
  id: number;
  bo3_slug: string;
  status: string;

  start_date: string;
  team1_id: number;
  team2_id: number;
  stars: number;

  games: IUpcomingGame[];
  team1: ITeamParticipant;
  team2: ITeamParticipant;

  ai_predictions: IAiPrediction;
  bo_type?: string;
  tier: string;
  tier_id?: number;
}
