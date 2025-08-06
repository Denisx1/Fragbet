import { Module } from '@nestjs/common';
import { TeamStatService } from './team-stat.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TeamStats } from './teamStatModel';

@Module({
  imports: [SequelizeModule.forFeature([TeamStats])],
  controllers: [],
  providers: [TeamStatService]
})
export class TeamStatModule {}
