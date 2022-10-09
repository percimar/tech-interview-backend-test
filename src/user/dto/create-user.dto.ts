import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsMongoId,
  Length,
} from 'class-validator';
import { IsUniqueEmail } from '../validators/is-unique-email.validator';
import { IsUniqueUsername } from '../validators/is-unique-username.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsUniqueUsername()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsUniqueEmail()
  email: string;

  @IsString()
  @IsMongoId()
  department_id: string;
}
