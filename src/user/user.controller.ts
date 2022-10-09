import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Permission } from 'src/role/permission.decorator';
import { rolePermissions } from 'src/role/role.schema';
import { TokenPayloadParam } from 'src/auth/token-payload.decorator';
import { TokenPayload } from 'src/auth/tokenPayload.dto';

@Permission(rolePermissions['Super Admin'])
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Permission(rolePermissions['Department Manager'])
  @Get()
  findAll(
    @TokenPayloadParam() payload: TokenPayload,
    @Query('username') username?: string,
    @Query('email') email?: string,
    @Query('role_id') role_id?: string,
    @Query('department_id') department_id?: string,
  ) {
    if (payload === null) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (payload.permissions === rolePermissions['Super Admin']) {
      return this.userService.findAll(username, email, role_id, department_id);
    }

    return this.userService.findAllByDepartmentId(
      payload.department_id,
      username,
      email,
      role_id,
    );
  }

  @Permission(rolePermissions['Department Manager'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Permission(rolePermissions['Department Manager'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
