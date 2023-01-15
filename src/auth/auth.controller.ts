import {
  Controller,
  UseGuards,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  async login(@Body() req: any) {
    const { email, password } = req;
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { _id, firstName, lastName, email, verified } =
      await this.userService.createUser(createUserDto);

    return { _id, firstName, lastName, email, verified };
  }
}
