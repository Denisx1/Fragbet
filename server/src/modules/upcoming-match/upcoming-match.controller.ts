import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { UpcomingMatchService } from "./upcoming-match.service";
import { Match } from "./upcomingMatchModel";

@Controller("upcomingMatchById")
export class UpcomingMatchController {
  constructor(private readonly upcomingMatchService: UpcomingMatchService) {}

  @Get(":id")
  async getMatchById(@Param("id", ParseIntPipe) id: number): Promise<Match> {
    return this.upcomingMatchService.getMatchById(id);
  }
}
