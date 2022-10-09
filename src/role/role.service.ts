import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Role, RoleDocument } from './role.schema';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  findOne(id: string) {
    return this.roleModel.findById(id).exec();
  }

  findOneByName(name: string) {
    return this.roleModel.findOne({ name }).exec();
  }
}
