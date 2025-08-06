import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product-repository";
import { CreateProductDto } from "./dto/create-product-dto";
import { CustomException } from "src/common/exceptions/custom.exception";

import { ModuleType } from "src/common/exceptions/enums";
import { ProductExceptionCodes } from "./enums/product-exceptions.enums";
import { ProductStripeRepository } from "../stripe/repositories/product-stripe-repository";
import { ProductMapper } from "./mappers/product-mapper";

@Injectable()
export class ProductService {
  constructor(
    private readonly stripeProductRepository: ProductStripeRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async create(dto: CreateProductDto) {
    try {
      const existingProduct = await this.productRepository.findOneByName(
        dto.name
      );
      if (existingProduct) {
        throw new CustomException({
          message: "Product already exists",
          statusCode: 400,
          errorCode: ProductExceptionCodes.PRODUCT_ALREADY_EXISTS,
          module: ModuleType.PRODUCT_MODULE,
        });
      }
      const stripeProductId = await this.stripeProductRepository.createProduct(
        dto.name
      );
      const product = await this.productRepository.createProduct({
        ...dto,
        stripeProductId: stripeProductId.id,
      });
      const productDto = ProductMapper.toProductDTO(product);
      return productDto;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return this.productRepository.findAll();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new CustomException({
        message: "Product not found",
        statusCode: 404,
        errorCode: ProductExceptionCodes.PRODUCT_NOT_FOUND,
        module: ModuleType.PRODUCT_MODULE,
      });
    }
    return ProductMapper.toProductDTO(product);
  }
}
