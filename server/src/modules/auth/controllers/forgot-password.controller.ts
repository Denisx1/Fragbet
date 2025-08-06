import { Body, Controller, Post, Put } from "@nestjs/common";
import { ForgotPasswordService } from "../services/forgot-password.service";
import { ZodValidationPipe } from "src/pipes/validation.pipe";
import { updateUsersFieldsSchema } from "src/zod.validator/forgot-password-email.validatiom";
import { setUsersFieldsSchema } from "src/zod.validator/set-password.dto";
@Controller("auth")
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post("forgot-password")
  async forgotPassword(
    @Body(new ZodValidationPipe(updateUsersFieldsSchema))
    body: {
      email: string;
    }
  ) {
    return this.forgotPasswordService.forgotPassword(body.email);
  }

  @Put("set-password-after-forgot")
  async setPasswordAfterForgot(
    @Body(new ZodValidationPipe(setUsersFieldsSchema))
    body: {
      actionToken: string;
      newPassword: string;
    }
  ) {
    return this.forgotPasswordService.setPasswordAfterForgot(
      body.actionToken,
      body.newPassword
    );
  }
}
