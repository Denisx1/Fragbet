import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Sequelize } from "sequelize-typescript";
import * as bodyParser from "body-parser";

import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
  });
  app.use(
    "/stripe/webhook",
    express.raw({ type: "application/json" }) // НЕ bodyParser.json()
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  const sequelize = app.get(Sequelize);
  await sequelize.sync();
  app.useStaticAssets(join(__dirname, "..", "public"));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
