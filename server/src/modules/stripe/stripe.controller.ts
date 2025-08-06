import { Controller, Post, Req, Headers, HttpCode } from "@nestjs/common";
import { StripeService } from "./stripe.service";
import { ICustomRequest } from "../auth/auth.interfaces";

@Controller("stripe")
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post("webhook")
  @HttpCode(200)
  async handleWebhook(
    @Req() req: ICustomRequest,
    @Headers("stripe-signature") signature: string
  ) {
    const rawBody = (req as any).body; // тут он уже Buffer
    const event = await this.stripeService.verifyWebhook(rawBody, signature);

    await this.stripeService.handleWebhookEvent(event);
  }
}
