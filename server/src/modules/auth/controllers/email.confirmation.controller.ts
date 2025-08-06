import { Body, Controller, Post } from "@nestjs/common";
import { EmailConfirmationService } from "../services/email.confirmation.service";

import { updateUsersFieldsSchema } from "src/zod.validator/forgot-password-email.validatiom";
import { setUsersFieldsSchema } from "src/zod.validator/set-password.dto";
import { ZodValidationPipe } from "src/pipes/validation.pipe";

@Controller("auth")
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService
  ) {}
  @Post("send-email-confirmation")
  async sendEmailConfirmation(
    @Body(new ZodValidationPipe(updateUsersFieldsSchema))
    body: {
      id: number;
    }
  ) {
    return this.emailConfirmationService.sendEmailConfirmation(body.id);
  }

  @Post("confirm-email")
  async confirmEmail(
    @Body(new ZodValidationPipe(setUsersFieldsSchema))
    body: {
      actionToken: string;
    }
  ) {
    return this.emailConfirmationService.confirmEmail(body.actionToken);
  }
}
