import { Module } from "@nestjs/common";
import { PlayerService } from "./player.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Player } from "./playerModel";

@Module({
  imports: [SequelizeModule.forFeature([Player])],
  providers: [PlayerService],
})
export class PlayerModule {}
