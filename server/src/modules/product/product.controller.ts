import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import { MinRoleGuard } from "../roles/guards/minRole.guard";
import { CreateProductDto } from "./dto/create-product-dto";
import { Roles } from "../roles/decorators/role.decorator";
import { RolesEnum } from "src/enums/roles.enum";
import { EmailVerifyGuard } from "src/common/email/guards/email.verify.guard";

@UseGuards(AuthGuard, EmailVerifyGuard, MinRoleGuard)
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Roles(RolesEnum.SUPER_ADMIN)
  @Post("create")
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }
  @Roles(RolesEnum.MANAGER)
  @Get("get-all")
  findAll() {
    return this.productService.findAll();
  }

  @Roles(RolesEnum.MANAGER)
  @Get("get-one/:id")
  findOne(@Param("id") id: number) {
    return this.productService.findOne(id);
  }
}
