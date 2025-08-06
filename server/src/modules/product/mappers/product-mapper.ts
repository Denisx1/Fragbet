import { ReturnProductDto } from "../dto/return-product-dto";
import { Product } from "../product.modele";

export class ProductMapper {
  static toProductDTO(product: Product): ReturnProductDto {
    const dto: ReturnProductDto = {
      id: product.id,
      name: product.name,
      description: product.description,
      stripeProductId: product.stripeProductId,
      isActive: product.isActive,
      plans: product.plans,
    };
    return dto;
  }
}
