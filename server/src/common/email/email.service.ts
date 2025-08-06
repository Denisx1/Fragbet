import { Inject, Injectable } from "@nestjs/common";
import {
  LambdaClient,
  InvokeCommand,
  InvocationType,
} from "@aws-sdk/client-lambda";

@Injectable()
export class EmailService {
  constructor(
    @Inject("LAMBDA_CLIENT") private readonly lambdaClient: LambdaClient
  ) {}

  async sendEmail(
    receiveEmail: string,
    emailAction: string,
    locals: Record<string, string>
  ) {
    try {
      const params = {
        FunctionName: process.env.AWS_LAMBDA_EMAIL_NAME,
        InvocationType: "RequestResponse" as InvocationType,
        Payload: JSON.stringify({
          receiveEmail,
          emailAction,
          locals,
        }),
      };
      
      const command = new InvokeCommand(params);

      await this.lambdaClient.send(command);
    } catch (error) {
      throw error;
    }
  }
}
