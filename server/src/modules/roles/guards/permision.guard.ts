import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RolesConfig } from "../roles.config";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
      process.env.PERMISSIONS_KEY,
      context.getHandler()
    );
    if (!requiredPermissions || requiredPermissions.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.authedUser;
    const userRoles = user.roles || [];

    const userPermissions = new Set<string>();

    for (const role of userRoles) {
      const conf = RolesConfig[role.value];
      if (conf && conf.permissions) {
        conf.permissions.forEach((p) => userPermissions.add(p));
      }
    }

    return requiredPermissions.some((p) => userPermissions.has(p));
  }
}
