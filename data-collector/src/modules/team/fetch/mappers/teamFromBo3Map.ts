import { TeamFromBO3 } from "../../types/teamsTypes";

export class TeamFromBo3Mapper {
  public map(team: unknown): TeamFromBO3 {
    if (
        typeof team !== 'object' || team === null 
      ) {
        throw new Error("Invalid team data");
      }

      const t = team as any;

      return {
        slug: String(t.slug),
        name: String(t.name),
       acronym: String(t.acronym),
       image_url: String(t.image_url),
        six_month_earned: Number(t.six_month_earned),
        country: {
          code: String(t.country?.code ?? ''),
          name: String(t.country?.name ?? ''),
          region: {
            slug: String(t.country?.region?.slug ?? ''),
            name: String(t.country?.region?.name ?? ''),
          },
        },
        rank: Number(t.rank),
        players: Array.isArray(t.players)
          ? t.players.map((p: any) => ({
              name: String(p.name ?? ''),
              slug: String(p.slug ?? ''),
              nickname: String(p.nickname ?? ''),
              country: String(p.country ?? ''),
              photo: String(p.photo ?? ''),
              role: String(p.role ?? ''),
            }))
          : [],
      };
  }
}

export function teamFromBo3Map(team: unknown): TeamFromBO3 {
  const instance = new TeamFromBo3Mapper();
  return instance.map(team);
}
