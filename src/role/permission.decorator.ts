import { SetMetadata } from '@nestjs/common';
import { PermissionLevel } from './role.schema';

export const PERMISSION_KEY = 'permission';
export const Permission = (...args: PermissionLevel[]) =>
  SetMetadata(PERMISSION_KEY, args);
