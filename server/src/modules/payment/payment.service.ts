import { HttpStatus, Injectable } from "@nestjs/common";

import { PaymentRepository } from "./payment.repository";
import { EmailService } from "src/common/email/email.service";
import { UserRepository } from "../user/user.repository";
import Stripe from "stripe";
import { CustomException } from "src/common/exceptions/custom.exception";
import { ModuleType } from "src/common/exceptions/enums";
import { PaymentExceptionCodes, PaymentStatus } from "./enums/payment.enums";
import { ActionEmailType } from "src/common/email/email.enums";

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepo: PaymentRepository,
    private readonly emailService: EmailService,
    private readonly userRepo: UserRepository
  ) {}
}
