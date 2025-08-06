import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { CustomException } from "src/common/exceptions/custom.exception";
import { ModuleType } from "src/common/exceptions/enums";
import { ErrorCodes } from "src/enums/exception.enums";
import { ZodSchema } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new CustomException({
        message: "Validation failed",
        statusCode: 400,
        errorCode: ErrorCodes.VALIDATION_FAILED,
        module: ModuleType.AUTH_MODULE,
      });
    }

    return result.data;
  }
}
