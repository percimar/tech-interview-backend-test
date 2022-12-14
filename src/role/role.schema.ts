import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

export type Roles = 'Guest' | 'Employee' | 'Department Manager' | 'Super Admin';
export type PermissionLevels = 0 | 1 | 2 | 3;

export const rolePermissions: Record<Roles, PermissionLevels> = {
  Guest: 0,
  Employee: 1,
  'Department Manager': 2,
  'Super Admin': 3,
};

@Schema()
export class Role {
  @Prop({
    type: String,
    enum: ['Guest', 'Employee', 'Department Manager', 'Super Admin'],
  })
  name: Roles;

  @Prop({
    type: Number,
    enum: [0, 1, 2, 3],
  })
  permissionLevel: PermissionLevels;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
