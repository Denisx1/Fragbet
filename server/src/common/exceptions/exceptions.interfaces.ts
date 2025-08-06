import { HttpStatus } from "@nestjs/common";
import { ModuleType } from "./enums";

export interface CustomExceptionParams {
  message: string;
  statusCode: HttpStatus;
  module: ModuleType;
  errorCode?: string;
  details?: any;
}
