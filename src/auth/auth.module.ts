import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET }), UserModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
