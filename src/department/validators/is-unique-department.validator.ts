import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DepartmentService } from '../department.service';

@ValidatorConstraint({ async: true })
export class IsUniqueDepartmentConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly departmentService: DepartmentService) {}

  async validate(department: string) {
    const userOrNull = await this.departmentService.findOneByName(department);
    return userOrNull === null;
  }
}

export function IsUniqueDepartmentName(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      async: true,
      options: {
        message: 'Department already exists',
        ...validationOptions,
      },
      validator: IsUniqueDepartmentConstraint,
    });
  };
}
