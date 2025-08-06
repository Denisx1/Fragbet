import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./roles.model";
import { IRoleData, RoleCreationAttrs } from "./roles.interfaces";
import { CustomException } from "src/common/exceptions/custom.exception";

@Injectable()
export class RolesRepository {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}

  async createRole(roleData: RoleCreationAttrs): Promise<IRoleData> {
    const role = await this.roleModel.create(roleData);
    return role;
  }

  async getAllRoles(): Promise<IRoleData[]> {
    const roles = await this.roleModel.findAll();
    return roles;
  }

  async getRoleByValue(value: string): Promise<Role | null> {
    const role = await this.roleModel.findOne({ where: { value } });
   
    return role;
  }
}
