import { SetMetadata } from '@nestjs/common';
import { PermissionsEnums } from '../../../enums/permissions.enum';

export const PERMISSIONS_KEY = process.env.PERMISSIONS_KEY;
export const Permissions = (...permissions: PermissionsEnums[]) => SetMetadata(PERMISSIONS_KEY, permissions);