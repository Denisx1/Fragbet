import { extractMatchSlug } from "../../utils/upcomingMatchesUtils";

export interface IncomingMatch {
  slug: string;
  opponents: Opponent[];
  begin_at: string;
  games: Game[];
}
export interface Opponent {
  pandascore_id: number;
  name: string;
  slug: string;
  location: string;
  acronym: string;
}
interface Game {
  status: string;
  position: number;
  end_at: string;
  complete: boolean;
  finished: boolean;
  begin_at: string;
}
function safeParseGame(obj: any): Game | null {
  if (
    obj &&
    typeof obj.status === "string" &&
    typeof obj.position === "number" &&
    typeof obj.complete === "boolean" &&
    typeof obj.finished === "boolean"
  ) {
    return {
      status: obj.status,
      position: obj.position,
      end_at: obj.end_at ?? null,
      complete: obj.complete,
      finished: obj.finished,
      begin_at: obj.begin_at ?? null,
    };
  }
  return null;
}

function safeParseOpponent(obj: any): Opponent | null {
  if (
    obj &&
    typeof obj.opponent.slug === "string" &&
    typeof obj.opponent.name === "string"
  ) {
    return {
      pandascore_id: obj.opponent.id,
      name: obj.opponent.name,
      slug: obj.opponent.slug,
      location: obj.opponent.location,
      acronym: obj.opponent.acronym,
    };
  }
  return null;
}
export class PandaMapperService {
  public mapUpcomingMatches(data: unknown): IncomingMatch[] {
    if (!Array.isArray(data)) {
      console.warn("⚠️ Data is not an array");
      return [];
    }

    const matches: IncomingMatch[] = [];

    for (const item of data) {
      // Проверка структуры
      if (
        typeof item !== "object" ||
        item === null ||
        typeof (item as any).slug !== "string" ||
        !Array.isArray((item as any).opponents) ||
        !Array.isArray((item as any).games) ||
        typeof (item as any).begin_at !== "string"
      ) {
        console.warn("❌ Невалидный матч, пропущен:", item);
        continue;
      }

      const slug = (item as any).slug;
      const opponents: Opponent[] = [];
      const rawOpponents = (item as any).opponents;

      for (const opp of rawOpponents) {
        const parsedOpp = safeParseOpponent(opp);
        if (parsedOpp) {
          opponents.push(parsedOpp);
        } else {
          console.warn(`❌ Проблема с оппонентом в матче ${slug}:`, opp);
        }
      }

      const games: Game[] = [];
      const rawGames = (item as any).games;

      for (const game of rawGames) {
        const parsedGame = safeParseGame(game);
        if (parsedGame) {
          games.push(parsedGame);
        } else {
          console.warn(`❌ Проблема с игрой в матче ${slug}:`, game);
        }
      }

      matches.push({
        slug,
        opponents,
        begin_at: (item as any).begin_at,
        games,
      });
    }

    console.log(`✅ Обработано матчей: ${matches.length} из ${data.length}`);
    return matches;
  }
}
