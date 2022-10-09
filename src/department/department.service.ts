import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department, DepartmentDocument } from 'src/schemas/department.schema';

import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

// TODO: Permissions
@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    const createdDepartment = new this.departmentModel(createDepartmentDto);
    return createdDepartment.save();
  }

  findAll() {
    return this.departmentModel.find().exec();
  }

  findOne(id: number) {
    return this.departmentModel.findById(id).exec();
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentModel
      .findByIdAndUpdate(id, updateDepartmentDto)
      .exec();
  }

  remove(id: number) {
    return this.departmentModel.findByIdAndDelete(id).exec();
  }
}
