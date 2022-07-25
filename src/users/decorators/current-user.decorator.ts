import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    /*
    data é qualquer parametro passado dentro do decorators
    */
    //context.switchToHttp().getRequest().params
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
