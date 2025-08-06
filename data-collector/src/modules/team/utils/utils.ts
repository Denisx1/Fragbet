import {
  MatchData,
  MatchWithSegregatedSlug,
} from "../../upcomingMatches/upcomingMatchService";
import { TeamFromBO3 } from "../types/teamsTypes";

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function isTeamFromBo3(obj: unknown): obj is TeamFromBO3 {
  if (typeof obj !== "object" || obj === null) return false;

  const team = obj as any;

  return (
    typeof team.slug === "string" &&
    typeof team.name === "string" &&
    typeof team.logo === "string" &&
    typeof team.rank === "number" &&
    typeof team.country === "object" &&
    typeof team.country.code === "string" &&
    typeof team.country.name === "string" &&
    typeof team.country.region === "object" &&
    typeof team.country.region.slug === "string" &&
    typeof team.country.region.name === "string" &&
    Array.isArray(team.players) &&
    team.players.every(
      (p: any) =>
        typeof p.name === "string" &&
        typeof p.slug === "string" &&
        typeof p.nickname === "string" &&
        typeof p.country === "string" &&
        typeof p.photo === "string" &&
        typeof p.role === "string"
    )
  );
}
export function hasSegregatedSlug(match: MatchData): match is MatchWithSegregatedSlug {
  return 'segregatedMatchSlug' in match;
}

export function extractUniqueTeam(slug: string): string[] {
  // 1. Ищем разделитель "-vs-"
  const vsIndex = slug.indexOf("-vs-");
  if (vsIndex === -1) {
    console.warn(`No "vs" found in slug: ${slug}`);
    return [];
  }

  // 2. Извлекаем имена команд
  const team1Raw = slug.slice(0, vsIndex);
  const team2Raw = slug.slice(vsIndex + 4); // 4 — длина "-vs-"

  // 3. Функция очистки: убрать пробелы, привести к нижнему регистру, удалить дату
  const clean = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/-\d{2}-\d{2}-\d{4}$/, ''); // убираем дату в формате -dd-mm-yyyy
  };

  const team1 = clean(team1Raw);
  const team2 = clean(team2Raw);

  // 4. Убираем пустые строки и дубликаты
  const teams = [team1, team2].filter(Boolean);
  const uniqueTeams = [...new Set(teams)];

  return uniqueTeams;
}
export function normalizeTeamName(name: string): string {
  return name
    .toLowerCase()                   // всё в нижний регистр
    .replace(/[^a-z0-9 ]/g, '')      // убрать спецсимволы
    .replace(/\bteam\b/g, '')        // убрать слово "team"
    .replace(/\bclan\b/g, '')        // убрать "clan"
    .replace(/\besports\b/g, '')     // убрать "esports"
    .replace(/\bacademy\b/g, '')     // убрать "academy"
    .replace(/\bclub\b/g, '')        // убрать "club"
    .replace(/\s+/g, ' ')            // убрать лишние пробелы
    .trim();                         // обрезать с краёв
}

// export function mapTeamWithAiPrediction()
