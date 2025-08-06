import { Player, PlayerCreationAttributes } from "../model/playerModel";
import { IPlayerRepository } from "./interface";

export class PlayerRepository implements IPlayerRepository {
  async createPlayer(
    players: PlayerCreationAttributes[]
  ): Promise<Player[]> {
    try {
      const newPlayer = await Player.bulkCreate(players, {
        updateOnDuplicate: ["player_slug"],
      });
      return newPlayer;
    } catch (error) {
      throw error;
    }
  }
  async getAllSlugs(slugs: string[]): Promise<string[]> {
    try {
      const existingPlayers = await Player.findAll({
        where: {
          player_slug: slugs,
        },
        attributes: ["player_slug"], // Только слаг
      });
      return existingPlayers.map((player) => player.get("player_slug"));
    } catch (error) {
      throw error;
    }
  }

  async getPlayerBySlug(
    slug: string
  ): Promise<Player | null> {
    try {
      const player = await Player.findOne({
        where: { player_slug: slug },
      });
      if (!player) {
        return null;
      }
      return player;
    } catch (error) {
      console.error("Ошибка при поиске команды по слагу:", error);
      return null;
    }
  }
}
