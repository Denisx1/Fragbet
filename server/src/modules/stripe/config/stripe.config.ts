import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

export const createStripeClient = (configService: ConfigService): Stripe => {
  return new Stripe(configService.get<string>('STRIPE_SECRET_KEY')!, {
    apiVersion: '2025-03-31.basil',
  });
};