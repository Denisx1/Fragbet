export interface IAiPrediction {
  id: number;
  match_id: number;
  match_slug: string;
  prediction_team1_score: number;
  prediction_team2_score: number;
  prediction_winner_team_id: number;
}
