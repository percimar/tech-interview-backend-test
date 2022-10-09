import { PermissionLevel, Roles } from 'src/role/role.schema';

export class TokenPayload {
  sub: number;
  username: string;
  role: Roles;
  permissions: PermissionLevel;
}
