import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepartmentDocument = Department &
  Document<string, null, Department>;

@Schema()
export class Department {
  @Prop()
  name: string;

  @Prop()
  location: string;

  @Prop()
  phoneNumber: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
