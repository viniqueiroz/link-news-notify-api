import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from './user.service';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users/:email')
  async getUser(@Param('email') email: string): Promise<User | null> {
    const user = await this.userService.findOne(email);
    if (!user) throw new NotFoundException();

    return user;
  }

  @Get('users')
  async getAllUsers(): Promise<User[] | null> {
    return await this.userService.findAll();
  }
}
