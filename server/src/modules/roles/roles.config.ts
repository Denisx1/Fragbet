import { RolesEnum } from "src/enums/roles.enum";
import { PermissionsEnums } from "../../enums/permissions.enum";

export const RolesConfig = {
  [RolesEnum.USER]: {
    description: "Basic user with limited access",
    permissions: [PermissionsEnums.READ],
    priority: 1,
  },
  [RolesEnum.MANAGER]: {
    description: "Manager with extended permissions",
    permissions: [PermissionsEnums.READ, PermissionsEnums.WRITE],
    priority: 2,
  },
  [RolesEnum.ADMIN]: {
    description: "Admin who can manage most of the system",
    permissions: [
      PermissionsEnums.READ,
      PermissionsEnums.WRITE,
      PermissionsEnums.DELETE,
      PermissionsEnums.ASSIGN_ROLES,
    ],
    priority: 3,
  },
  [RolesEnum.SUPER_ADMIN]: {
    description: "Super admin with full access",
    permissions: Object.values(PermissionsEnums),
    priority: 4,
  },
};
