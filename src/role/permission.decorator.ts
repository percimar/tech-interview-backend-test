import { SetMetadata } from '@nestjs/common';
import { PermissionLevels } from './role.schema';

export const PERMISSION_KEY = 'permission';
export const Permission = (...args: PermissionLevels[]) =>
  SetMetadata(PERMISSION_KEY, args);
