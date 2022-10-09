import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenPayload } from 'src/auth/tokenPayload.dto';

import { PERMISSION_KEY } from './permission.decorator';
import { PermissionLevels, rolePermissions } from './role.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.getAllAndOverride<
      PermissionLevels[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);
    // If no permission is required, always allow access
    if (!requiredPermission) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const bearer = req.headers.authorization;
    // If no bearer token is provided, access is allowed only for Guest actions
    if (!bearer) return requiredPermission.includes(rolePermissions['Guest']);

    const token = bearer.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      }) as TokenPayload;

      // "Super Admin Role has no limitation on the scope of system usage"
      if (payload.permissions === rolePermissions['Super Admin']) return true;

      // If the user has the required permission, allow access
      return requiredPermission.includes(payload.permissions);
    } catch {
      // If verifications produces an error (bad token), deny access
      return false;
    }
  }
}
