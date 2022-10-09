import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
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

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto).exec();
  }

  remove(id: string) {
    return this.userModel.findOneAndDelete({ _id: id }).exec();
  }
}
