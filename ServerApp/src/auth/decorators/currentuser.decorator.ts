import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../schemas/user.schema';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const user: User = ctx.switchToHttp().getRequest().user;
    console.log("Current user: " + user);

    if (!user) {
      return null;
    }

    return user; // extract a specific property only if specified or get a user object
  },
);