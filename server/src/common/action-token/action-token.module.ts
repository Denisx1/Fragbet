import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ActionToken } from "./action-token.model";

import { ActionTokenRepository } from "./action-token.repository";

@Module({
  imports: [SequelizeModule.forFeature([ActionToken])],
  providers: [ActionTokenRepository],
  exports: [ActionTokenRepository],
})
export class ActionTokenModule {}
