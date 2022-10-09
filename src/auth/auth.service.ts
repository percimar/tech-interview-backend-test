import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByUsername(loginDto.username);
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      // removing password field from user object
      // variable only exists for destructuring of user object
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userDetails } = user;
      return userDetails;
    }
    return null;
  }
}
