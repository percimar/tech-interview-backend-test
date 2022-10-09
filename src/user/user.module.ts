import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoleModule } from 'src/role/role.module';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IsUniqueUsernameConstraint } from './validators/is-unique-username.validator';
import { IsUniqueEmailConstraint } from './validators/is-unique-email.validator';
import { DepartmentModule } from 'src/department/department.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RoleModule,
    DepartmentModule,
  ],
  controllers: [UserController],
  providers: [UserService, IsUniqueUsernameConstraint, IsUniqueEmailConstraint],
  exports: [UserService],
})
export class UserModule {}
