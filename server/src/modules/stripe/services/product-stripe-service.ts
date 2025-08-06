import { Injectable } from "@nestjs/common";
import { ProductStripeRepository } from "../repositories/product-stripe-repository";

@Injectable()
export class ProductStripeService {
    constructor(private readonly productStripeRepository: ProductStripeRepository) {}
}