import {
  PlayerMatches,
  PlayerMatchesCreationAttributes,
} from "../model/player`sMatchModel";

export interface IPlayerMatchRepository {
  createPlayerMatch(
    playerMatches: PlayerMatchesCreationAttributes[]
  ): Promise<PlayerMatches[]>;
  getPlayerMatchById: (outside_id: number) => Promise<PlayerMatches | null>;
  getAllPlayerMatches(ids: number[]): Promise<PlayerMatches[]>;
}
