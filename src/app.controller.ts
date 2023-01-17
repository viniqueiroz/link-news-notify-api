import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { RoleType } from './constants/constants';
import { Auth } from './decorators/auth.decorator';

@Controller({ version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Auth([RoleType.USER])
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
