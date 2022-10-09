import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';

@ValidatorConstraint({ async: true })
export class IsUniqueUsernameConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserService) {}

  async validate(username: string) {
    const userOrNull = await this.userService.findByUsername(username);
    return userOrNull === null;
  }
}

export function IsUniqueUsername(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      async: true,
      options: {
        message: 'Username is already taken',
        ...validationOptions,
      },
      validator: IsUniqueUsernameConstraint,
    });
  };
}
