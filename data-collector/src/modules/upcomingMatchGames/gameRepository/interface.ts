import { Game, GameCreationAttributes } from '../gameModel/gameModel'

export interface IGameRepository {
  createGames(games: GameCreationAttributes[]): Promise<Game[]>;
  createGame(game: GameCreationAttributes): Promise<Game>;
}
