export interface TeamFromBO3 {
  id?: number;
  slug: string;
  name: string;
  acronym: string;
  image_url: string;
  six_month_earned: number;
  country: Country;
  rank: number;
  players?: Player[];
}
interface Region {
  slug: string;
  name: string;
}
interface Country {
  code: string;
  name: string;
  region: Region;
}
interface Player {
  name: string;
  slug: string;
  nickname: string;
  country: string;
  photo: string;
  role: string;
}

export type TeamFromBO3WithoutPlayers = Omit<
  TeamFromBO3,
  "players" | "country"
>;
export type TeamFromBO3WithoutPlayersAndCountry = Omit<
  TeamFromBO3,
  "country" | "players"
> & { country_id: number | null };
