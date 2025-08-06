import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { RolesConfig } from "../roles.config";
import { CustomException } from "src/common/exceptions/custom.exception";
import { RoleExceptionCodes } from "../enums/roleEnum";
import { ModuleType } from "src/common/exceptions/enums";

@Injectable()
export class AssignRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.authedUser;
    const body = request.body;

    const userRoles = user.roles || [];
    const maxUserPriority = Math.max(
      ...userRoles.map((r) => RolesConfig[r.value].priority)
    );

    const newRoleValue = body?.value || body?.role;
    if (!newRoleValue || !RolesConfig[newRoleValue]) {
      throw new CustomException({
        message: "Invalid role value",
        statusCode: 400,
        errorCode: RoleExceptionCodes.INVALID_ROLE_VALUE,
        module: ModuleType.ROLES_MODULE,
      });
    }

    const newRolePriority = RolesConfig[newRoleValue].priority;

    if (newRolePriority >= maxUserPriority) {
      throw new CustomException({
        message: `You cannot assign a role equal or higher than your own`,
        statusCode: 403,
        errorCode: RoleExceptionCodes.CANNOT_ASSIGN_ROLE_TO_USER,
        module: ModuleType.ROLES_MODULE,
      });
    }

    return true;
  }
}
