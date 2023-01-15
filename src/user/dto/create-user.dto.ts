import { User } from '../user.entity';

export class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  verified: boolean;

  constructor(user: User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.verified = user?.verified;
  }
}
