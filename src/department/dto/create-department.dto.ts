import { IsNotEmpty, IsString } from 'class-validator';
import { IsUniqueDepartmentName } from '../validators/is-unique-department.validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  @IsUniqueDepartmentName()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}
