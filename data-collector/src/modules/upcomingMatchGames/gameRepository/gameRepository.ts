import { GameCreationAttributes, Game } from "../gameModel/gameModel";
import { IGameRepository } from "./interface";

export class GameRepository implements IGameRepository {
  async createGames(games: GameCreationAttributes[]) {
    return Game.bulkCreate(games, {
      updateOnDuplicate: ["id"],
    });
  }
  async createGame(game: GameCreationAttributes): Promise<Game> {
    return Game.create(game);
  }
}
