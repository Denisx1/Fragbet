import { UpcomingMatchUpdate } from "../types/matchUpdate";
import {
  Match,
  MatchCreationAttributes,
} from "../upcomingMatchModel/upcomingMatchModel";

export interface IMatchRepository {
  createMatch: (match: MatchCreationAttributes) => Promise<Match>;
  getAllMatches: () => Promise<Match[]>;
  findBySlug: (slug: string) => Promise<Match | null>;
  updateMatch(id: number, data: UpcomingMatchUpdate): Promise<void>;
  // bulkUpdateMatches(
  //   updatedMatches: Omit<
  //     MatchData & { tier_id: number },
  //     "ai_prediction" | "games"
  //   >[]
  // ): Promise<void>;
}
