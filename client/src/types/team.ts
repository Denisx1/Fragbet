import type { ICountry } from "./country";

export interface ITeamParticipant {
  id: number;
  name: string;
  slug: string;
  rank: number;
  image_url: string;
  six_month_earned: number;
  country_id: number;
  country: ICountry;
}
