import { Module } from "@nestjs/common";
import { CustomApiErrorFilter } from "./custom.exception.filter";

@Module({
  providers: [
    {
      provide: "APP_FILTER",
      useClass: CustomApiErrorFilter,
    },
  ],
  exports: [],
})
export class CustomExceptionModule {}
