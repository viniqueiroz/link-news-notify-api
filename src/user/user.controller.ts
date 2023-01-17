import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { RoleType } from 'src/constants/constants';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/user/user.entity';
import { UserService } from './user.service';
@Controller({ version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth([RoleType.ADMIN])
  @Get('users/:email')
  async getUser(@Param('email') email: string): Promise<User | null> {
    const user = await this.userService.findOne(email);
    if (!user) throw new NotFoundException();

    return user;
  }

  @Auth([RoleType.ADMIN])
  @Get('users')
  async getAllUsers(): Promise<User[] | null> {
    return await this.userService.findAll();
  }
}
