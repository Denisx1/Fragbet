import { Injectable } from "@nestjs/common";
import { Match } from "./upcomingMatchModel";
import { UpcomingMatchRepository } from "./upcomingMatchRepository";

@Injectable()
export class UpcomingMatchService {
  constructor(
    private readonly upcomingMatchRepository: UpcomingMatchRepository
  ) {}
  async getMatchById(id: number): Promise<Match> {
    return this.upcomingMatchRepository.getMatchById(id);
  }
}
