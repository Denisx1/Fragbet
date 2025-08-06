import { Injectable } from "@nestjs/common";
import { ActionTokenRepository } from "src/common/action-token/action-token.repository";
import { EmailService } from "src/common/email/email.service";
import { CustomException } from "src/common/exceptions/custom.exception";
import { PasswordService } from "src/common/auth/password/password.service";
import { TokenService } from "src/common/auth/token/token.service";

import { IUserData } from "src/modules/user/user.interfaces";
import { UserRepository } from "src/modules/user/user.repository";
import { ModuleType } from "src/common/exceptions/enums";
import { AuthExceptionCodes } from "../enums/authEnum";
import { ActionEmailType } from "src/common/email/email.enums";
import { TokenType } from "src/common/auth/token/enums";

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
    private readonly actionTokenRepository: ActionTokenRepository,
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService
  ) {}

  async forgotPassword(email: string): Promise<string> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new CustomException({
          message: `User with this email: ${email} not found`,
          statusCode: 404,
          errorCode: AuthExceptionCodes.USER_NOT_FOUND,
          module: ModuleType.AUTH_MODULE,
        });
      }
      const actionToken = this.tokenService.generateActionToken({ email });
      this.actionTokenRepository.create({
        userId: user.id,
        token: actionToken,
        actionType: "forgot-password",
      });

      const forgotPasswordUrl =
        process.env.FORGOT_PASSWORD_URL?.replace("%TOKEN%", actionToken) || "";
      this.emailService.sendEmail(email, ActionEmailType.FORGOT_PASSWORD, {
        name: user.email,
        forgotPasswordUrl,
      });
      return actionToken;
    } catch (error) {
      throw error;
    }
  }
  async setPasswordAfterForgot(
    actionToken: string,
    newPassword: string
  ): Promise<IUserData> {
    try {
      this.tokenService.validateToken(actionToken, TokenType.ACTION_TOKEN);
      const userWithToken =
        await this.actionTokenRepository.findByToken(actionToken);
      if (!userWithToken) {
        throw new CustomException({
          message: `User with this token: ${actionToken} not found`,
          statusCode: 404,
          errorCode: AuthExceptionCodes.USER_NOT_FOUND,
          module: ModuleType.AUTH_MODULE,
        });
      }
      const isTheSamePassword = await this.passwordService.comparePasswords(
        newPassword,
        userWithToken.token
      );
      if (isTheSamePassword) {
        throw new CustomException({
          message: "New password is the same as the old password",
          statusCode: 400,
          errorCode: AuthExceptionCodes.INVALID_PASSWORD,
          module: ModuleType.AUTH_MODULE,
        });
      }
      const hashedPassword =
        await this.passwordService.hashPassword(newPassword);
      const updatedUser = await this.userRepository.update(
        userWithToken.userId,
        { password: hashedPassword }
      );
      await this.actionTokenRepository.delete(userWithToken.id);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}
