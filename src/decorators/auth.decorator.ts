import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import type { RoleType } from 'src/constants/constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

export function Auth(roles: RoleType[] = []): MethodDecorator {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
