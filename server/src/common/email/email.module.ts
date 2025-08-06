import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { lambdaProvider } from './lambda.provider';

@Module({
  providers: [EmailService, lambdaProvider],
  exports: [EmailService]
})
export class EmailModule {}
