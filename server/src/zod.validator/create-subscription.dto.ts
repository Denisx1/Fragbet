import { z } from "zod";

export const createSubscriptionSchema = z.object({
  name: z.string(), // Название подписки
  description: z.string(), // Описание подписки
  price: z.number().min(0, "Price must be a positive number"), // Цена подписки, не может быть отрицательной
  durationDays: z.number().int().positive(), // Продолжительность подписки в днях (положительное целое число)
  interval: z.enum(["day", "week", "month", "year"]), // Интервал для подписки

  // Структура биллинга (регулярный платеж)
  billingCycle: z.object({
    interval: z.enum(["day", "week", "month", "year"]), // Интервал для биллинга
    frequency: z.number().min(1, "Frequency must be at least 1"), // Частота платежей
  }),

  // Пробный период, если он есть
  trialPeriod: z
    .object({
      interval: z.enum(["day", "week", "month", "year"]), // Интервал для пробного периода
      frequency: z.number().min(1, "Trial period frequency must be at least 1"), // Частота пробного периода
    })
    .optional(), // Пробный период может быть опциональным
  subscriptionType: z.enum(["regular", "trial"]), // Тип подписки
});

export type CreateSubscriptionDto = z.infer<typeof createSubscriptionSchema>;
