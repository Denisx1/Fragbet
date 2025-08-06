import { FetchHandler } from "../fetch/fetchHandler";
import { MatchData } from "../interfaces/tierInterfaces";
import { MatchRepository } from "../repository/tierRepository/matchRepository";
import { IMatchUpdateServiceDependencies } from "./interfaces/matchUpdateInterface";

class MatchUpdateService {
  constructor(private readonly dependencies: IMatchUpdateServiceDependencies) {}

  async updateMatches(): Promise<void> {
    try {
      // Получаем список завершённых матчей

      const matches = await this.getFinishedMatches();
      for (const match of matches) {
        try {
          // Обновляем матч по slug
          await this.dependencies.matchRepository.updateMatch(
            match.slug,
            match
          );
        } catch (error) {
          console.error(`Ошибка при обновлении матча ${match.slug}:`, error);
        } 
      }
    } catch (error) {
      console.error("Ошибка при получении матчей:", error);
      throw error; // Пробрасываем ошибку дальше, если нужно
    }
  }

  private async getFinishedMatches(): Promise<
    Pick<
      MatchData,
      "slug" | "status" | "parsed_status" | "team1_score" | "team2_score"
    >[]
  > {
    try {
      const matches = await this.dependencies.fetchService.getFinishedMatches();
      const filterMatches = matches.map((match) => ({
        slug: match.slug,
        status: match.status,
        parsed_status: match.parsed_status,
        team1_score: match.team1_score,
        team2_score: match.team2_score,
      }));
      return filterMatches;
    } catch (error) {
      console.error("Ошибка при получении завершённых матчей:", error);
      throw error; // Возвращаем ошибку, если не удалось получить данные
    }
  }
}
export async function updateMatches(): Promise<void> {
  const dependencies: IMatchUpdateServiceDependencies = {
    fetchService: new FetchHandler(),
    matchRepository: new MatchRepository(),
  };
  const matchUpdateService = new MatchUpdateService(dependencies);
  await matchUpdateService.updateMatches();
}
