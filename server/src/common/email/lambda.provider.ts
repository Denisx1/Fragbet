import { LambdaClient } from "@aws-sdk/client-lambda";

export const lambdaProvider = {
  provide: "LAMBDA_CLIENT",
  useFactory: () => {
    return new LambdaClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
      },
    });
  },
};
