export interface IMatchData {
  slug: string;
  status: string;
  bo_type: number;
  start_date: string;
  tier: string;
  team1_id: number;
  team2_id: number;
  stars: number;
  ai_prediction: AIPrediction;
  games: IGame[];
}
export interface AIPrediction {
  match_slug: string;
  prediction_team1_score: number;
  prediction_team2_score: number;
  prediction_winner_team_id: number;
}
export interface IGame {
  number: number;
  status: string;
}
export class BO3mapperService {
  public matchMap(rawData: unknown): IMatchData[] {
    if (!Array.isArray(rawData)) {
      return [];
    }

    const matchMap = new Map<string, IMatchData>();

    for (const item of rawData) {
      if (Array.isArray(item)) {
        for (const subItem of item) {
          if (
            typeof subItem === "object" &&
            subItem !== null &&
            "slug" in subItem &&
            "ai_predictions" in subItem
          ) {
            const match = subItem as any;

            // Проверка на обязательные поля
            const requiredFields = [
              "slug",
              "status",
              "bo_type",
              "tier",
              "start_date",
              "stars",
              "ai_predictions",
              "games",
            ];

            const hasAllFields = requiredFields.every(
              (key) => match[key] !== undefined && match[key] !== null
            );

            if (!hasAllFields) {
              console.warn(
                `[BO3mapperService] Пропущен матч: недостаточно данных → slug: ${match.slug}`
              );
              continue;
            }

            if (!matchMap.has(match.slug)) {
              matchMap.set(match.slug, {
                slug: match.slug,
                status: match.status,
                bo_type: match.bo_type,
                tier: match.tier,
                team1_id: 0,
                team2_id: 0,
                start_date: match.start_date,
                stars: match.stars,
                ai_prediction: {
                  match_slug: match.slug,
                  prediction_team1_score:
                    match.ai_predictions.prediction_team1_score,
                  prediction_team2_score:
                    match.ai_predictions.prediction_team2_score,
                  prediction_winner_team_id: 0,
                },
                games: match.games,
              });
            }
          } else {
            console.warn(
              `[BO3mapperService] Неверный формат subItem: ожидается объект с полями slug и ai_predictions`
            );
          }
        }
      } else {
        console.warn(
          `[BO3mapperService] Пропущен элемент: ожидается массив внутри rawData`
        );
      }
    }

    return Array.from(matchMap.values());
  }
}
