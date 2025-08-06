import { Module } from "@nestjs/common";
import { PasswordModule } from "./auth/password/password.module";
import { EmailModule } from "./email/email.module";
import { TokenModule } from "./auth/token/token.module";
import { CustomExceptionModule } from "./exceptions/exceptions.module";

import { ActionTokenModule } from "./action-token/action-token.module";

@Module({ 
  imports: [
    PasswordModule,
    EmailModule,
    TokenModule,
    CustomExceptionModule,
    ActionTokenModule,
  ],
  providers: [
    PasswordModule,
    EmailModule,
    TokenModule,
    ActionTokenModule,
  ],
  exports: [PasswordModule, EmailModule, TokenModule, ActionTokenModule],
})
export class CommonModule {}
