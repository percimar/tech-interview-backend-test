import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Department, DepartmentSchema } from './department.schema';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { IsUniqueDepartmentConstraint } from './validators/is-unique-department.validator';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
    ]),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService, IsUniqueDepartmentConstraint],
  exports: [DepartmentService],
})
export class DepartmentModule {}
