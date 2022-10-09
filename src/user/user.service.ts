import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from 'src/role/role.service';
import { DepartmentService } from 'src/department/department.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly roleService: RoleService,
    private readonly departmentService: DepartmentService,
  ) {}

  // Role field has to be populated, default role for a new user is 'Employee'
  // Department_id needs to exist in departments collection
  // Password is hashed before saving
  async create(createUserDto: CreateUserDto): Promise<User> {
    const employeeRole = await this.roleService.findOneByName('Employee');
    if (employeeRole === null)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const { department_id, password, ...rest } = createUserDto;

    const departmentOrNull = await this.departmentService.findOne(
      department_id,
    );

    if (departmentOrNull === null)
      throw new HttpException('Department not found', HttpStatus.BAD_REQUEST);

    const userModel = {
      role: employeeRole._id,
      department: departmentOrNull._id,
      password: await bcrypt.hash(password, 8),
      ...rest,
    };

    const createdUser = new this.userModel(userModel);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).populate('role').exec();
  }

  findByUsername(username: string) {
    return (
      this.userModel
        // Regex i flag makes search case insensitive, ^ and $ make it exact
        .findOne({ username: new RegExp('^' + username + '$', 'i') })
        .populate('role')
        .exec()
    );
  }

  findByEmail(email: string) {
    return (
      this.userModel
        // Regex i flag makes search case insensitive, ^ and $ make it exact
        .findOne({ email: new RegExp('^' + email + '$', 'i') })
        .populate('role')
        .exec()
    );
  }

  // Department_id needs to exist in departments collection
  // Password is hashed before saving
  // Logic is not exactly duplicated since these fields may not exist
  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password, department_id, ...rest } = updateUserDto;

    if (department_id !== undefined) {
      const departmentOrNull = await this.departmentService.findOne(
        department_id,
      );

      if (departmentOrNull === null)
        throw new HttpException('Department not found', HttpStatus.BAD_REQUEST);
    }

    const userModel = {
      password: password && (await bcrypt.hash(password, 8)),
      department: department_id,
      ...rest,
    };

    return this.userModel.findOneAndUpdate({ _id: id }, userModel).exec();
  }

  remove(id: string) {
    return this.userModel.findOneAndDelete({ _id: id }).exec();
  }
}
