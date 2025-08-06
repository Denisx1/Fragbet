export interface IUpcomingGame {
  id: number;
  match_id: number;
  number: number;
  status: string;
  complete: boolean;
  finished: boolean;
  begin_at: string;
  end_at: string;
  map: string;
}
