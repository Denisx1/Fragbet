import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./roles.model";
import { RolesService } from "./roles.service";
import { User } from "../user/user.model";
import { UserRoles } from "./user-roles.model";
import { RolesController } from "./roles.controller";
import { RolesRepository } from "./roles.repository";
import { AuthModule } from "../auth/auth.module";
import { forwardRef } from "@nestjs/common";
import { TokenModule } from "src/common/auth/token/token.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles]),
    forwardRef(() => AuthModule),
    TokenModule,
    UserModule,
  ],
  providers: [RolesService, RolesRepository],
  exports: [RolesRepository],
  controllers: [RolesController],
})
export class RolesModule {}
