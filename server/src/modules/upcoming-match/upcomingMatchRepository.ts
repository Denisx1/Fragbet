import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Match } from "./upcomingMatchModel";

@Injectable()
export class UpcomingMatchRepository {
  constructor(
    @InjectModel(Match)
    private readonly matchModel: typeof Match
  ) {}

  async getMatchById(id: number): Promise<Match> {
    try {
      const match = await this.matchModel.findByPk(id);
      if (!match) {
        throw new Error(`Match with id ${id} not found`);
      }
      return match;
    } catch (error) {
      throw error;
    }
  }
}
