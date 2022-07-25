import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { cookieUser } = request.session || {};

    if (cookieUser) {
      const user = await this.usersService.findOne(cookieUser);
      request.currentUser = user;
    }

    return handler.handle();
  }
}
