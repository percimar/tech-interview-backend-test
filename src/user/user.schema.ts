import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Department } from '../department/department.schema';
import { Role } from '../role/role.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  email: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department' })
  department: Department;
}

export const UserSchema = SchemaFactory.createForClass(User);
