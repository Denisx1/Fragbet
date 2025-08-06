import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create.role.dto";

import { createRoleSchema } from "src/zod.validator/create-role.dto";
import { IRoleData } from "./roles.interfaces";

import { AuthGuard } from "../auth/guards/auth.guard";
import { RolesEnum } from "src/enums/roles.enum";
import { EmailVerifyGuard } from "src/common/email/guards/email.verify.guard";
import { MinRoleGuard } from "./guards/minRole.guard";
import { Roles } from "./decorators/role.decorator";
import { AssignRoleGuard } from "./guards/assignRole.guard";
import { ZodValidationPipe } from "src/pipes/validation.pipe";

@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(AuthGuard, EmailVerifyGuard, MinRoleGuard)
  @Roles(RolesEnum.SUPER_ADMIN)
  @Post("create")
  async createRole(
    @Body(new ZodValidationPipe(createRoleSchema)) roleDto: CreateRoleDto
  ): Promise<IRoleData> {
    return this.rolesService.createRole(roleDto);
  }

  @UseGuards(AuthGuard, EmailVerifyGuard, MinRoleGuard)
  @Roles(RolesEnum.ADMIN)
  @Get("all")
  async getAllRoles(): Promise<IRoleData[]> {
    return this.rolesService.getAllRoles();
  }

  @UseGuards(AuthGuard, EmailVerifyGuard, MinRoleGuard, AssignRoleGuard)
  @Roles(RolesEnum.ADMIN)
  @Get(":value")
  async getRoleByValue(@Param("value") value: string): Promise<IRoleData> {
    return this.rolesService.getRoleByValue(value);
  }
}
