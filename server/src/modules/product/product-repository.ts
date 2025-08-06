import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product, ProductCreationAttrs } from "./product.modele";

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product
  ) {}

  async createProduct(productData: ProductCreationAttrs): Promise<Product> {
    return this.productModel.create(productData);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Product | null> {
    return this.productModel.findByPk(id, { include: { all: true } });
  }
  async findOneByName(name: string): Promise<Product | null> {
    return this.productModel.findOne({ where: { name } });
  }
}
