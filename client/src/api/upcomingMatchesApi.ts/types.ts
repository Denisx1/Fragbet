import type { IUpcomingMatch } from "../../types/match";

export type MatchCardProps = Pick<
  IUpcomingMatch,
  "id" | "bo3_slug" | "team1" | "team2" | "stars" | "start_date" | "status" | "tier" | "bo_type" | "ai_predictions"
>;
