import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TokenPayloadParam } from 'src/auth/token-payload.decorator';
import { TokenPayload } from 'src/auth/tokenPayload.dto';
import { Permission } from 'src/role/permission.decorator';
import { rolePermissions } from 'src/role/role.schema';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Permission(rolePermissions['Super Admin'])
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @Permission(rolePermissions['Department Manager'])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @TokenPayloadParam() payload: TokenPayload,
  ) {
    if (
      payload.permissionLevel === rolePermissions['Department Manager'] &&
      payload.department_id !== id
    ) {
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
    }
    return this.departmentService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(id);
  }
}
