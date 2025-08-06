import { Injectable } from "@nestjs/common";
import { DraftPlanRepository } from "./draft-plan-repository";
import { CreateDraftPlanDto } from "./dto/create-draft-plan.dto";
import { ProductRepository } from "../product/product-repository";
import { ModuleType } from "src/common/exceptions/enums";
import { DraftPlanExceptions } from "./enums/draft-plan-exceptions.enums";
import { CustomException } from "src/common/exceptions/custom.exception";

import { PlanRepository } from "../plan/plan-repository";

import { EmailService } from "src/common/email/email.service";
import { UserRepository } from "../user/user.repository";
import { ActionEmailType } from "src/common/email/email.enums";
import { DraftPlan } from "./draft-plan-model";
import { DraftPlanStatus } from "./enums/draft-plan-status";
import { PriceStripeRepository } from "../stripe/repositories/price-stripe-repositoruy";
import { DraftPriceMapper } from "./mappers/draft.price.mapper";
import { DraftPlanMapper } from "./mappers/draft.plan.mapper";
import { PlanInterval } from "../plan/enums/plan-interval.enam";
import { PlanCurrency } from "../plan/enums/plan-currence.enam";

@Injectable()
export class DraftPlanService {
  constructor(
    private readonly draftPlanRepository: DraftPlanRepository,
    private readonly productRepository: ProductRepository,
    private readonly priceStripeRepository: PriceStripeRepository,
    private readonly planRepository: PlanRepository,
    private readonly emailService: EmailService,
    private readonly userRepository: UserRepository
  ) {}

  async createDraftPlan(
    draftPlanData: CreateDraftPlanDto,
    createdByUserId: number
  ): Promise<DraftPlan> {
    try {
      const productInDb = await this.productRepository.findOneByName(
        draftPlanData.productName
      );
      if (!productInDb) {
        throw new CustomException({
          message: "Product not found",
          statusCode: 404,
          errorCode: DraftPlanExceptions.PRODUCT_NOT_FOUND,
          module: ModuleType.DRAFT_PLAN_MODULE,
        });
      }
      const mappedDraftPlanData = DraftPlanMapper.toDraftPlanCreationAttrs(
        draftPlanData,
        productInDb.id,
        createdByUserId
      );
      const draftPlan =
        await this.draftPlanRepository.createDraftPlan(mappedDraftPlanData);
      const userWhoCreated = await this.userRepository.findById(
        draftPlan.createdByUserId
      );
      this.emailService.sendEmail(
        userWhoCreated!.email,
        ActionEmailType.PLAN_PENDING,
        {
          planName: draftPlan.name,
          planDescription: draftPlan.description,
          price: draftPlan.price.toString(),
          currency: draftPlan.currency,
          interval: draftPlan.interval,
        }
      );
      return draftPlan;
    } catch (error) {
      throw error;
    }
  }

  async approveDraftPlan(draftPlanId: number, approvedByUserId: number) {
    try {
      const now = new Date();
      const draftPlanInDb =
        await this.draftPlanRepository.findOneById(draftPlanId);

      if (!draftPlanInDb) {
        throw new CustomException({
          message: "Draft plan not found",
          statusCode: 404,
          errorCode: DraftPlanExceptions.DRAFT_PLAN_NOT_FOUND,
          module: ModuleType.DRAFT_PLAN_MODULE,
        });
      }
      const mappedDraftPlanData =
        DraftPriceMapper.toStripePriceParams(draftPlanInDb);

      const priceId =
        await this.priceStripeRepository.createPrice(mappedDraftPlanData);
      await Promise.all([
        this.planRepository.createPlan({
          name: draftPlanInDb.name,
          description: draftPlanInDb.description,
          stripePriceId: priceId.id,
          price: draftPlanInDb.price,
          currency: draftPlanInDb.currency as PlanCurrency,
          interval: draftPlanInDb.interval as PlanInterval,
          productId: draftPlanInDb.product.id,
          createdByUserId: draftPlanInDb.createdByUserId,
          approvedByUserId: approvedByUserId,
        }),
        this.draftPlanRepository.updateDraftPlan(draftPlanId, {
          updateByUserId: approvedByUserId,
          updateAt: now,
          approved: true,
          status: DraftPlanStatus.APPROVED,
        }),
      ]);
      const userWhoCreated = await this.userRepository.findById(
        draftPlanInDb.createdByUserId
      );

      this.emailService.sendEmail(
        userWhoCreated!.email,
        ActionEmailType.PLAN_APPROVED,
        {
          planName: draftPlanInDb.name,
          planDescription: draftPlanInDb.description,
          price: draftPlanInDb.price.toString(),
          currency: draftPlanInDb.currency,
          interval: draftPlanInDb.interval,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async rejectDraftPlan(draftPlanId: number, rejectedByUserId: number) {
    try {
      const now = new Date();
      const draftPlanInDb =
        await this.draftPlanRepository.findOneById(draftPlanId);

      if (!draftPlanInDb) {
        throw new CustomException({
          message: "Draft plan not found",
          statusCode: 404,
          errorCode: DraftPlanExceptions.DRAFT_PLAN_NOT_FOUND,
          module: ModuleType.DRAFT_PLAN_MODULE,
        });
      }
      await this.draftPlanRepository.updateDraftPlan(draftPlanId, {
        updateByUserId: rejectedByUserId,
        updateAt: now,
        approved: false,
        status: DraftPlanStatus.REJECTED,
      });
      const userWhoCreated = await this.userRepository.findById(
        draftPlanInDb.createdByUserId
      );

      this.emailService.sendEmail(
        userWhoCreated!.email,
        ActionEmailType.PLAN_REJECTED,
        {
          planName: draftPlanInDb.name,
          planDescription: draftPlanInDb.description,
          price: draftPlanInDb.price.toString(),
          currency: draftPlanInDb.currency,
          interval: draftPlanInDb.interval,
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
