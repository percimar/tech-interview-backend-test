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

  findAll(
    username?: string,
    email?: string,
    role_id?: string,
    department_id?: string,
  ) {
    let query = this.userModel.find({
      username: new RegExp(username || '', 'i'),
      email: new RegExp(email || '', 'i'),
    });
    if (role_id) query = query.where('role').equals(role_id);
    if (department_id) query = query.where('department').equals(department_id);
    return query.select('-password').exec();
  }

  findAllByDepartmentId(
    department_id: string,
    username?: string,
    email?: string,
    role_id?: string,
  ) {
    let query = this.userModel.find({
      department: department_id,
      username: new RegExp(username || '', 'i'),
      email: new RegExp(email || '', 'i'),
    });
    if (role_id) query = query.where('role').equals(role_id);
    return query.select('-password').exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).populate('role').exec();
  }

  findOneByUsername(username: string) {
    return (
      this.userModel
        // Regex i flag makes search case insensitive, ^ and $ make it exact
        .findOne({ username: new RegExp('^' + username + '$', 'i') })
        .populate('role')
        .exec()
    );
  }

  findOneByEmail(email: string) {
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
