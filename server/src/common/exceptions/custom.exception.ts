import { HttpException, HttpStatus } from "@nestjs/common";
import { ModuleType } from "./enums";
import { CustomExceptionParams } from "./exceptions.interfaces";

export class CustomException extends HttpException {
  private module: ModuleType;

  constructor(params: CustomExceptionParams) {
    super(
      {
        message: params.message,
        errorCode: params.errorCode,
        module: params.module,
        details: params.details,
      },
      params.statusCode
    );
    this.module = params.module;
  }

  getModule() {
    return this.module;
  }
}
