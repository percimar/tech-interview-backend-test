import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/login.dto';
import { Permission } from './role/permission.decorator';
import { rolePermissions } from './role/role.schema';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // If we have other auth functions this would be moved to AuthController
  @Permission(rolePermissions['Guest'])
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
