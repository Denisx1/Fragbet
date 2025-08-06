import { Injectable } from "@nestjs/common";
import { RolesRepository } from "./roles.repository";
import { CreateRoleDto } from "./dto/create.role.dto";
import { CustomException } from "src/common/exceptions/custom.exception";
import { IRoleData } from "./roles.interfaces";
import { ModuleType } from "src/common/exceptions/enums";
import { RoleExceptionCodes } from "./enums/roleEnum";

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}
  async createRole(roleDto: CreateRoleDto): Promise<IRoleData> {
    const role = await this.rolesRepository.getRoleByValue(roleDto.value);
    if (role) {
      throw new CustomException({
        message: `Role with this value: ${roleDto.value} already exists`,
        statusCode: 409,
        errorCode: RoleExceptionCodes.ROLE_ALREADY_EXISTS,
        module: ModuleType.ROLES_MODULE,
      });
    }
    return this.rolesRepository.createRole(roleDto);
  }
  async getAllRoles(): Promise<IRoleData[]> {
    return this.rolesRepository.getAllRoles();
  }
  async getRoleByValue(value: string): Promise<IRoleData> {
    const role = await this.rolesRepository.getRoleByValue(value);
    if (!role) {
      throw new CustomException({
        message: `Role with this value: ${value} not found`,
        statusCode: 404,
        errorCode: RoleExceptionCodes.ROLE_NOT_FOUND,
        module: ModuleType.ROLES_MODULE,
      });
    }
    return role;
  }
}
