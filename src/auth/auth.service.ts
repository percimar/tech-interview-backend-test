import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { LoginDto } from './login.dto';
import { TokenPayload } from './tokenPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByUsername(loginDto.username);
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const payload: TokenPayload = {
        sub: user.id,
        username: user.username,
        role: user.role.name,
        permissions: user.role.permissions,
      };
      return {
        accessToken: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
        }),
      };
    }
    return null;
  }
}
