# Tech Interview Backend Test

API Server created with
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

Prerequisite: MongoDB instance running at `localhost:27017` with database `techTestDB`. Some sample data is available in the `db_data` directory. Password for all sample users is 'password' encrypted with [bcrypt](https://bcrypt-generator.com/).

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

- Guest can login

  ```
  POST /login
      Required Body Parameters:
          username: string
          password: string

      Returns JWT access token, must be included for bearer auth
  ```

- Super admin can create or delete a user

  ```
  POST /user
      Required Body Parameters:
          username: string
          password: string
          email: string
          firstname: string
          department_id: string (GET /department first)

  DELETE /user/:id
  ```

- Super admin can view user details
  ```
  GET /user/:id
  ```
- Super admin can list all users
  ```
  GET /user
  ```
- Department manager can list all users in their department
  ```
  GET /user
  ```
- Super admin can search for users by username, email, department, or role.

  ```
  GET /user
      Optional Query Parameters:
          username: string
          email: string
          department_id: string (GET /department first)
          role_id: string (GET /role first)

      Parameters of the same type are OR'd i.e.
          /user?department_id={IT_dept_id}&department_id={HR_dept_id}
      will list users in HR or in IT

      Parameters of different type are AND'd i.e.
          /user?username=mohd&email=@gmail.com
      will only list users with mohd in username and @gmail.com in email
  ```

- Department manager can search for users that belong to their department by username, email, department, or role.

  ```
  GET /user
      Optional Query Parameters:
          username: string
          email: string
          role_id: string (GET /role first)

      Parameters of the same type are OR'd i.e.
          /user?role_id={employee_role_id}&role_id={super_admin_role_id}
      will list users who are employees or super admins

      Parameters of different type are AND'd i.e.
          /user?username=mohd&email=@gmail.com
      will only list users with mohd in username and @gmail.com in email
  ```

- Super admin can create or delete a department

  ```
  POST /department
      Required Body Parameters:
          name: string
          location: string
          phoneNumber: string

  DELETE /department/:id
  ```

- Super admin can view the details of a department
  ```
  GET /department/:id
  ```
- Super admin can update the details of a department
  ```
  PATCH /department/:id
  ```
- Department manager can update the details of their department
  ```
  PATCH /department/:id
  ```
- Super admin can assign a user to a department
  ```
  PATCH /user/:id
      Body Parameter
          department_id: string (GET /department first)
  ```
- Super admin can list all departments
  ```
  GET /department
  ```
