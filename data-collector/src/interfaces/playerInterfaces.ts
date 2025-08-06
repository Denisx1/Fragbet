export interface IPlayerDetails {
  id?: number;
  player_slug: string;
  player_nickname: string;
  player_image_url: string;
  team_name: string;
  team_slug: string;
  team_image_url: string;
  team_id: number | null;
  matches: IPlayerMatchDetails[];
}

export interface IPlayerMatchDetails {
  id?: number;
  outside_id: number;
  match_slug: string;
  player_slug: string;
  player_nickname: string;
  player_image_url: string;
  match_start_date: string; // Можно использовать Date, если предполагается работа с датами
  tournament_id: number;
  tournament_slug: string;
  team_id: number;
  team_slug: string;
  team_name: string;
  team_image_url: string;
  enemy_team_id: number;
  enemy_team_slug: string;
  enemy_team_name: string;
  enemy_team_image_url: string;
  for_game_ids: number[];
  for_game_map_name: string[];
  game_numbers: number[];
  game_wins: number[];
  rounds_count: number;
  stats: IPlayerStatsForEveryMatch[];
}
export interface IPlayerStatsForEveryMatch {
  steam_profile_nickname: string;
  player_slug: string;
  player_nickname: string;
  player_image_url: string;
  player_country_code: string;
  team_clan_name: string;
  team_slug: string;
  player_rating: number;
  player_rating_value: number;
  total_player_rating_value: number;
  hits: number;
  shots: number;
  kills: number;
  multikills: number;
  death: number;
  assists: number;
  damage: number;
  first_kills: number;
  first_death: number;
  trade_kills: number;
  trade_death: number;
  headshots: number;
  accuracy: number;
  headshots_accuracy: number;
  money_save: number;
  total_equipment_value: number;
  avg_kill_cost: number;
  avg_100dmg_cost: number;
}
