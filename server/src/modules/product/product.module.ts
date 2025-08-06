import { Module } from "@nestjs/common";

import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "./product.modele";
import { ProductRepository } from "./product-repository";

import { TokenModule } from "src/common/auth/token/token.module";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { StripeModule } from "../stripe/stripe.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Product]),
    StripeModule,
    TokenModule,
    AuthModule,
    UserModule,
    StripeModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductRepository],
})
export class ProductModule {}
