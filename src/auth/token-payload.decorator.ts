import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { TokenPayload } from './tokenPayload.dto';

export const TokenPayloadParam = createParamDecorator<TokenPayload>(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const bearer = req.headers.authorization;

    // Shouldn't happen since RoleGuard would have already rejected the request
    if (!bearer) return null;

    // We're decoding the token's base64 payload without verifying it as
    // this code will only execute after the RoleGuard that verifies the token
    // However, there may be some edge case where a token is decoded here
    // without being verified by the RoleGuard, so it is worth pointing this
    // out as a potential security issue, specially since it would give the
    // attacker to increase their permissions level to a Super Admin
    // If in the future there is some api route that bypasses the RoleGuard
    // and uses permission levels, this decorator needs to verify instead.
    const token = bearer.split(' ')[1];
    const encodedPayload = token.split('.')[1];
    const buf = Buffer.from(encodedPayload, 'base64');
    const payload = JSON.parse(buf.toString()) as TokenPayload;

    return payload;
  },
);
