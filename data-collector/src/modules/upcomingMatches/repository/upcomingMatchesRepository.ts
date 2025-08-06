import { UpcomingMatchUpdate } from "../types/matchUpdate";
import {
  Match,
  MatchCreationAttributes,
} from "../upcomingMatchModel/upcomingMatchModel";
import { IMatchRepository } from "./upcomingMatches";

export class MatchRepository implements IMatchRepository {
  async createMatch(match: MatchCreationAttributes): Promise<Match> {
    const newMatches = await Match.create(match);
    return newMatches;
  }
  async getAllMatches(): Promise<Match[]> {
    const allMatches = await Match.findAll();
    return allMatches;
  }
  async findBySlug(slug: string): Promise<Match | null> {
    return Match.findOne({ where: { bo3_slug: slug } });
  }

  async updateMatch(id: number, data: UpcomingMatchUpdate): Promise<void> {
    try {
      const match = await Match.findByPk(id);
      if (!match) {
        console.log(`Матч с id ${id} не найден`);
        return;
      }
      await match.update(data);
    } catch (error) {
      throw error;
    }
  }

  // async bulkUpdateMatches(
  //   updatedMatches: UpcomingMatchUpdate[]
  // ): Promise<void> {
  //   try {
  //     // Убедимся, что массив не пуст
  //     if (updatedMatches.length > 0) {
  //       // Для каждого объекта в массиве обновим данные в базе
  //       await Match.bulkCreate(updatedMatches, {
  //         updateOnDuplicate: ["team1_id", "team2_id"],
  //       });
  //       console.log(`Updated ${updatedMatches.length} matches.`);
  //     } else {
  //       console.warn("No matches to update.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating matches:", error);
  //     throw error;
  //   }
  // }
}
