import { Module } from "@nestjs/common";
import { TierController } from "./tier.controller";
import { TierRepository } from "./tier.repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { Tier } from "./models/tier.model";
import { Game } from "./models/game.model";
import { Code } from "./models/code.model";

@Module({
  imports: [SequelizeModule.forFeature([Tier, Game, Code ])],
  controllers: [TierController],
  providers: [TierRepository],
})
export class TierModule {}
