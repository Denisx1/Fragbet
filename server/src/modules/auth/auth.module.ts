import { forwardRef, Module } from "@nestjs/common";

import { SequelizeModule } from "@nestjs/sequelize";
import { Auth } from "./auth.model";
import { AuthRepository } from "./auth.repository";
import { UserModule } from "../user/user.module";
import { PasswordModule } from "src/common/auth/password/password.module";
import { TokenModule } from "src/common/auth/token/token.module";
import { EmailModule } from "src/common/email/email.module";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { ForgotPasswordService } from "./services/forgot-password.service";
import { ActionTokenModule } from "src/common/action-token/action-token.module";
import { ForgotPasswordController } from "./controllers/forgot-password.controller";
import { EmailConfirmationController } from "./controllers/email.confirmation.controller";
import { EmailConfirmationService } from "./services/email.confirmation.service";
import { RolesModule } from "../roles/roles.module";

import { AuthGuard } from "./guards/auth.guard";

import { EmailVerifyGuard } from "src/common/email/guards/email.verify.guard";

import { MinRoleGuard } from "../roles/guards/minRole.guard";
import { StripeModule } from "../stripe/stripe.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Auth]),
    UserModule,
    PasswordModule,
    TokenModule,
    EmailModule,
    ActionTokenModule,
    forwardRef(() => RolesModule),
    StripeModule,
  ],
  providers: [
    AuthService,
    AuthRepository,
    ForgotPasswordService,
    EmailConfirmationService,
    AuthGuard,
    EmailVerifyGuard,
    MinRoleGuard,
  ],
  controllers: [
    AuthController,
    ForgotPasswordController,
    EmailConfirmationController,
  ],
  exports: [
    AuthService,
    AuthRepository,
    AuthGuard,
    EmailVerifyGuard,
    MinRoleGuard,
  ],
})
export class AuthModule {}
