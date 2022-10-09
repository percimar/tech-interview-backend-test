import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepartmentDocument = Department &
  Document<string, null, Department>;

@Schema()
export class Department {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  phoneNumber: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
