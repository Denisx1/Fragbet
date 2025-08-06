import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";

import {
  CreateUserDto,
  registerUserSchema,
} from "src/zod.validator/create-user.dto.zod";
import { ICustomRequest } from "../auth.interfaces";
import { AuthUserDto } from "../dto/auth.user.dto";
import { AuthGuard } from "../guards/auth.guard";
import { tokenType } from "../decorators/token.decorator";

import { ZodValidationPipe } from "src/pipes/validation.pipe";
import { TokenType } from "src/common/auth/token/enums";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(
    @Body(new ZodValidationPipe(registerUserSchema))
    createUserDto: CreateUserDto,
    @Req() req: ICustomRequest
  ) {
    return this.authService.register(createUserDto, req.userData);
  }

  @Post("login")
  async login(@Body() loginDto: AuthUserDto, @Req() req: ICustomRequest) {
    return this.authService.login(loginDto, req.userData);
  }
  @Post("logout")
  @UseGuards(AuthGuard)
  async logout(@Req() req: ICustomRequest) {
    const logoutUser = await this.authService.logout(req.authedUser);
    return logoutUser;
  }
  @Post("refresh")
  @UseGuards(AuthGuard)
  @tokenType(TokenType.REFRESH_TOKEN)
  async refresh(@Req() req: ICustomRequest) {
    return this.authService.refresh(
      {
        id: req.authedUser.id,
        userId: req.authedUser.userId,
      },
      req.userData
    );
  }
}
