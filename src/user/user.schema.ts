import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Department } from '../department/department.schema';
import { Role } from '../role/role.schema';

export type UserDocument = User &
  Document<mongoose.Schema.Types.ObjectId, null, User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true })
  role: Role;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  })
  department: Department;
}

export const UserSchema = SchemaFactory.createForClass(User);
