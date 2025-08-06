import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Team } from './team.model';

@Module({
  imports: [SequelizeModule.forFeature([Team])],
  controllers: [],
  providers: [TeamService]
})
export class TeamModule {}
