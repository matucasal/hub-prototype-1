import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(UsersService)
    private readonly _usersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.cookies?.jwt) {
      const user = await this._usersService.me(request.cookies.jwt);
      if (user) {
        return true;
      }
    }

    return false;
  }
}
