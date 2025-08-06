import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { DraftPlanService } from "./draft-plan.service";
import { ZodValidationPipe } from "src/pipes/validation.pipe";
import {
  CreateDraftPlanDto,
  CreateDraftPlanDtoSchema,
} from "./dto/create-draft-plan.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { Roles } from "../roles/decorators/role.decorator";
import { RolesEnum } from "src/enums/roles.enum";
import { EmailVerifyGuard } from "src/common/email/guards/email.verify.guard";
import { MinRoleGuard } from "../roles/guards/minRole.guard";
import { ICustomRequest } from "../auth/auth.interfaces";

@UseGuards(AuthGuard, EmailVerifyGuard, MinRoleGuard)
@Controller("draft-plan")
export class DraftPlanController {
  constructor(private readonly draftPlanService: DraftPlanService) {}

  @Post("create")
  @Roles(RolesEnum.MANAGER)
  createDraftPlan(
    @Body(new ZodValidationPipe(CreateDraftPlanDtoSchema))
    draftPlanData: CreateDraftPlanDto,
    @Req() req: ICustomRequest
  ) {
    return this.draftPlanService.createDraftPlan(
      draftPlanData,
      req.authedUser.id
    );
  }

  @Patch("approve/:draftPlanId")
  @Roles(RolesEnum.ADMIN)
  approveDraftPlan(
    @Param("draftPlanId", ParseIntPipe) draftPlanId: number,
    @Req() req: ICustomRequest
  ) {
    return this.draftPlanService.approveDraftPlan(
      draftPlanId,
      req.authedUser.id
    );
  }
  @Patch("reject/:draftPlanId")
  @Roles(RolesEnum.ADMIN)
  rejectDraftPlan(
    @Param("draftPlanId", ParseIntPipe) draftPlanId: number,
    @Req() req: ICustomRequest
  ) {
    return this.draftPlanService.rejectDraftPlan(
      draftPlanId,
      req.authedUser.id
    );
  }
}
