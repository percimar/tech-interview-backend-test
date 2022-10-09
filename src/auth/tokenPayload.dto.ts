import { PermissionLevels, Roles } from 'src/role/role.schema';

export class TokenPayload {
  sub: number;
  username: string;
  department_id: string;
  role: Roles;
  permissions: PermissionLevels;
}
