import { PermissionsEnums } from "src/enums/permissions.enum";
import { z } from "zod";

export const createRoleSchema = z.object({
  value: z.string().min(1), // Проверка значения роли, минимальная длина 1 символ
  description: z.string().min(10), // Проверка длины описания
  permissions: z.array(
    z.enum([
      PermissionsEnums.READ,
      PermissionsEnums.WRITE,
      PermissionsEnums.DELETE,
      PermissionsEnums.UPDATE,
      PermissionsEnums.CREATE,
      PermissionsEnums.ASSIGN_ROLES,
      PermissionsEnums.MANAGE_SETTINGS,
    ])
  ), // Проверка массива с правами
});

export type CreateRoleDto = z.infer<typeof createRoleSchema>;
