import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

export type Roles = 'Guest' | 'Employee' | 'Department Manager' | 'Super Admin';

export const rolePermissions = {
  Guest: 0,
  Employee: 1,
  'Department Manager': 2,
  'Super Admin': 3,
};

@Schema()
export class Role {
  @Prop()
  name: keyof typeof rolePermissions;

  @Prop()
  permissions: typeof rolePermissions[Roles];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
