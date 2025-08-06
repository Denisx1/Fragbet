import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RolesConfig } from "../roles.config"; // путь к enum и конфигу
import { RolesEnum } from "src/enums/roles.enum";

@Injectable()
export class MinRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<RolesEnum[]>(
      "roles",
      context.getHandler()
    );
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.authedUser.dataValues;

    const userRoles = user.roles || [];
    const maxUserPriority = Math.max(
      ...userRoles.map((r) => RolesConfig[r.value].priority)
    );
    const requiredPriority = RolesConfig[requiredRoles[0]].priority;

    return maxUserPriority >= requiredPriority;
  }
}
