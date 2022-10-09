import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department, DepartmentDocument } from './department.schema';

import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

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

  findOne(id: string) {
    return this.departmentModel.findById(id).exec();
  }

  findOneByName(name: string) {
    return (
      this.departmentModel
        // Regex i flag makes search case insensitive, ^ and $ make it exact
        .findOne({ name: new RegExp('^' + name + '$', 'i') })
        .exec()
    );
  }

  update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentModel
      .findByIdAndUpdate(id, updateDepartmentDto)
      .exec();
  }

  remove(id: string) {
    return this.departmentModel.findByIdAndDelete(id).exec();
  }
}
