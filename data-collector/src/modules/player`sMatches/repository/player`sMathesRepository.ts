import {
  PlayerMatches,
  PlayerMatchesCreationAttributes,
} from "../model/player`sMatchModel";
import { IPlayerMatchRepository } from "./interface";

export class PlayerMatchRepository implements IPlayerMatchRepository {
  async createPlayerMatch(
    playerMatches: PlayerMatchesCreationAttributes[]
  ): Promise<PlayerMatches[]> {
    try {
      const newPlayerMatch = await PlayerMatches.bulkCreate(playerMatches);
      return newPlayerMatch;
    } catch (error) {
      throw error;
    }
  }
  async getPlayerMatchById(outside_id: number): Promise<PlayerMatches | null> {
    try {
      const playerMatch = await PlayerMatches.findOne({
        where: { outside_id },
      });
      return playerMatch;
    } catch (error) {
      throw error;
    }
  }
  async getAllPlayerMatches(ids: number[]): Promise<PlayerMatches[]> {
    try {
      const allPlayerMatches = await PlayerMatches.findAll({
        where: {
          id: ids,
        },
        attributes: ["id"], // Только id
      });
      return allPlayerMatches;
    } catch (error) {
      throw error;
    }
  }
}
