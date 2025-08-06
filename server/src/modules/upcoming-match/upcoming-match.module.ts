import { Module } from "@nestjs/common";
import { UpcomingMatchService } from "./upcoming-match.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Match } from "./upcomingMatchModel";
import { UpcomingMatchRepository } from "./upcomingMatchRepository";

@Module({
  imports: [SequelizeModule.forFeature([Match])],
  controllers: [],
  providers: [UpcomingMatchService, UpcomingMatchRepository],
})
export class UpcomingMatchModule {}
