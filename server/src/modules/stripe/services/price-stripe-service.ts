import { Injectable } from "@nestjs/common";
import { PriceStripeRepository } from "../repositories/price-stripe-repositoruy";

@Injectable()
export class PriceStripeService {
    constructor(private readonly priceStripeRepository: PriceStripeRepository) {}
}
    