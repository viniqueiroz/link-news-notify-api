import { RoleType } from 'src/constants/constants';
import { User } from '../user.entity';

export class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: RoleType = RoleType.USER;
  verified = false;

  constructor(user: User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role;
    this.verified = user.verified;
  }
}
