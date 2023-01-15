import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    let user: User;
    try {
      user = await this.usersService.findOne(email);
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${email}`,
      );
    }

    if (user && !compareSync(password, user.password)) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${email}`,
      );
    }

    return user;
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }

  async login(user: User) {
    console.log(user);

    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
