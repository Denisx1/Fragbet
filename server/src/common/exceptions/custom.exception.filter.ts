import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";
import { CustomException } from "./custom.exception";

@Catch(CustomException)
export class CustomApiErrorFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // В зависимости от типа исключения можно менять обработку
    let status = 500;
    let message = "An error occurred";
    let errorCode = "UNKNOWN_ERROR";
    let details = null;

    // Обрабатываем CustomException
    if (exception instanceof CustomException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = exceptionResponse["message"] || message;
      module = exceptionResponse["module"] || module;
      errorCode = exceptionResponse["errorCode"] || errorCode;
      details = exceptionResponse["details"] || details;
    }

    // Форматируем ответ
    response.status(status).json({
      statusCode: status,
      errorCode: errorCode,
      module: module,
      message: message,
      details: details,
    });
  }
}
