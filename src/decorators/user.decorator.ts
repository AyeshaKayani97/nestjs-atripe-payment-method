import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserDecorator = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest()['user'];
  },
);
