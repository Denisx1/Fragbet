import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { UserRepository } from "./user.repository";
import { Role } from "../roles/roles.model";

@Module({
  imports: [SequelizeModule.forFeature([User, Role, ])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
