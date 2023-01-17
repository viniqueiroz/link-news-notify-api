import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isEmpty } from 'lodash';
import { User } from 'src/user/user.entity';
import type { RoleType } from '../../constants/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleType[]>('roles', context.getHandler());

    if (isEmpty(roles)) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = <User>request.user;

    return user && roles.includes(user.role);
  }
}
