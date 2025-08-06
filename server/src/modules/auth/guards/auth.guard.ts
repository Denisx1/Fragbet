import { CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { CustomException } from "src/common/exceptions/custom.exception";
import { TokenService } from "src/common/auth/token/token.service";
import { ErrorCodes } from "src/enums/exception.enums";

import { AuthRepository } from "../auth.repository";
import { TokenType } from "src/common/auth/token/enums";
import { ModuleType } from "src/common/exceptions/enums";
import { AuthExceptionCodes } from "../enums/authEnum";

export class AuthGuard implements CanActivate {
  TokensType: string;
  constructor(
    @Inject(TokenService) private readonly tokenService: TokenService,
    @Inject(AuthRepository) private readonly authRepository: AuthRepository,
    @Inject(Reflector) private readonly reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const tokenType =
        this.reflector.get<string>("tokenType", context.getHandler()) ??
        TokenType.ACCESS_TOKEN;
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers["authorization"];
      if (!authHeader) {
        throw new CustomException({
          message: "Authorization header is missing",
          statusCode: 401,
          errorCode: AuthExceptionCodes.AUTHORIZATION_HEADER_MISSING,
          module: ModuleType.AUTH_MODULE,
        });
      }
      const [type, token] = authHeader.split(" ");
      if (type !== "Bearer" || !token) {
        throw new CustomException({
          message: "Invalid token format",
          statusCode: 401,
          errorCode: AuthExceptionCodes.INVALID_TOKEN_FORMAT,
          module: ModuleType.AUTH_MODULE,
        });
      }
      const isValid = this.tokenService.validateToken(token, tokenType);
      if (isValid) {
        const decodeData = await this.authRepository.getUserByToken(
          token,
          tokenType
        );
        if (!decodeData) {
          throw new CustomException({
            message: "User not found",
            statusCode: 404,
            errorCode: AuthExceptionCodes.USER_NOT_FOUND,
            module: ModuleType.AUTH_MODULE,
          });
        }
        request.authedUser = decodeData;
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}
