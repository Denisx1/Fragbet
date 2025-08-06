import { addYears, addMonths, addWeeks, addDays } from "date-fns";
import { PlanInterval } from "../../plan/enums/plan-interval.enam";
import { StripeExceptionCodes } from "../enums/stripe-exceptions.enum";
import { ModuleType } from "src/common/exceptions/enums";
import { CustomException } from "src/common/exceptions/custom.exception";

// Функция для добавления временного интервала в текущую дату
export function addSubscriptionPeriod(startDate: Date, period: PlanInterval): Date {
  console.log("period", period);
  switch (period) {
    case PlanInterval.YEAR:
      return addYears(startDate, 1); // Добавляет 1 год
    case PlanInterval.MONTH:
      return addMonths(startDate, 1); // Добавляет 1 месяц
    case PlanInterval.WEEK:
      return addWeeks(startDate, 1); // Добавляет 1 неделю
    case PlanInterval.DAY:
      return addDays(startDate, 1); // Добавляет 1 день
    default:
      throw new CustomException({
        message: "Unknown subscription period",
        statusCode: 400,
        errorCode: StripeExceptionCodes.UNKNOWN_SUBSCRIPTION_PERIOD,
        module: ModuleType.STRIPE_MODULE,
      });
  }
}
