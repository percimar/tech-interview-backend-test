import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { DepartmentModule } from './department/department.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/techTestDB'),
    ConfigModule.forRoot(),
    UserModule,
    DepartmentModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
