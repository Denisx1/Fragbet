export interface TeamFromPanda {
  id: number;
  name: string;
  location: string;
  slug: string;
  players: PlayerFromPanda[];
  modified_at: string;
  acronym: string;
  image_url: string;
  current_videogame: { id: number; name: string; slug: string };
}
interface PlayerFromPanda {
  active: boolean;
  id: number;
  name: string;
  role: string;
  slug: string;
  modified_at: string;
  age: number;
  birthday: string;

  first_name: string;
  last_name: string;
  nationality: string;

  image_url: string;
}
export class FetchServiceTeamFromPanda {
  async getTeams(ids: number[]): Promise<TeamFromPanda[]> {
    try {
      const response = await fetch(
        `https://api.pandascore.co/csgo/teams?filter[id]=${ids.join(",")}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PANDASCORE_API_KEY}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export function fetchTeamsFromPanda(ids: number[]): Promise<TeamFromPanda[]> {
  const instance = new FetchServiceTeamFromPanda();
  return instance.getTeams(ids);
}
