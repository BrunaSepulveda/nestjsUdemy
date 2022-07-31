import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // se o valor de retorno puder ser convertido para true é permitido proseguir com a requisição
    return request.session.userId;
  }
}
