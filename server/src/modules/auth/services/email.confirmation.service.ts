import { Injectable } from "@nestjs/common";
import { ActionTokenRepository } from "src/common/action-token/action-token.repository";
import { EmailService } from "src/common/email/email.service";
import { CustomException } from "src/common/exceptions/custom.exception";
import { TokenService } from "src/common/auth/token/token.service";

import { IUserData } from "src/modules/user/user.interfaces";
import { UserRepository } from "src/modules/user/user.repository";
import { UserDto } from "../dto/user.dto";
import { AuthExceptionCodes } from "../enums/authEnum";
import { ModuleType } from "src/common/exceptions/enums";
import { TokenType } from "src/common/auth/token/enums";

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly actionTokenRepository: ActionTokenRepository
  ) {}
  async sendEmailConfirmation(id: number): Promise<string> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new CustomException({
          message: `User with this id: ${id} not found`,
          statusCode: 404,
          errorCode: AuthExceptionCodes.USER_NOT_FOUND,
          module: ModuleType.AUTH_MODULE,
        });
      }
      if (user.isEmailConfirm) {
        throw new CustomException({
          message: `User with this id: ${id} already confirmed`,
          statusCode: 400,
          errorCode: AuthExceptionCodes.USER_ALREADY_CONFIRMED_EMAIL,
          module: ModuleType.AUTH_MODULE,
        });
      }
      const actionToken = this.tokenService.generateActionToken({
        email: user.email,
      });
      this.actionTokenRepository.create({
        userId: user.id,
        token: actionToken,
        actionType: "email-confirmation",
      });
      const confirmEmailUrl =
        process.env.CONFIRMATION_EMAIL_URL?.replace("%TOKEN%", actionToken) ||
        "";
      this.emailService.sendEmail(user.email, "confirmEmail", {
        name: user.email,
        confirmEmailUrl,
      });
      return actionToken;
    } catch (error) {
      throw error;
    }
  }
  async confirmEmail(
    actionToken: string
  ): Promise<Omit<IUserData, "password">> {
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
      const user = await this.userRepository.findById(userWithToken.userId);
      if (!user) {
        throw new CustomException({
          message: `User with this id: ${userWithToken.userId} not found`,
          statusCode: 404,
          errorCode: AuthExceptionCodes.USER_NOT_FOUND,
          module: ModuleType.AUTH_MODULE,
        });
      }
      const updatedUser = await this.userRepository.update(user.id, {
        isEmailConfirm: true,
      });
      this.actionTokenRepository.delete(userWithToken.id);
      const userDto = new UserDto();
      userDto.setData(updatedUser);
      return userDto;
    } catch (error) {
      throw error;
    }
  }
}
