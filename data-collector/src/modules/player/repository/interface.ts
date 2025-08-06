import { Player, PlayerCreationAttributes } from "../model/playerModel";

export interface IPlayerRepository {
  createPlayer(players: PlayerCreationAttributes[]): Promise<Player[]>;
  getAllSlugs: (slugs: string[]) => Promise<string[]>;
  getPlayerBySlug:(slug: string)=> Promise<Player | null>;
}
