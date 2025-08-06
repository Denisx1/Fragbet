import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CustomException } from "src/common/exceptions/custom.exception";

import { UserRepository } from "src/modules/user/user.repository";

import { ModuleType } from "src/common/exceptions/enums";
import { EmailExceptionCodes } from "../email.enums";

@Injectable()
export class EmailVerifyGuard implements CanActivate {
  constructor(private readonly userRepo: UserRepository) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authedUser = request.authedUser;
      if (!authedUser) {
        throw new CustomException({
          message: "User not authorized",
          statusCode: 403,
          module: ModuleType.EMAIL_MODULE,
          errorCode: EmailExceptionCodes.USER_NOT_AUTHORIZED,
        });
      }
      const user = await this.userRepo.findById(authedUser.userId);

      if (!user) {
        throw new CustomException({
          message: "User not found",
          statusCode: 404,
          module: ModuleType.EMAIL_MODULE,
          errorCode: EmailExceptionCodes.USER_NOT_FOUND,
        });
      }
      if (!user.isEmailConfirm) {
        throw new CustomException({
          message: "Email not confirmed",
          statusCode: 403,
          module: ModuleType.EMAIL_MODULE,
          errorCode: EmailExceptionCodes.USERS_EMAIL_NOT_CONFIRMED,
        });
      }
      request.authedUser = user;
      return true;
    } catch (error) {
      throw error;
    }
  }
}
