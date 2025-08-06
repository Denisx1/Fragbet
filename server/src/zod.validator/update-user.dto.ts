import { z } from "zod";

// Создание схемы для обновления пользователя
export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().optional(),
  isEmailConfirm: z.boolean().optional(),
  activeSubscriptionId: z.number().nullable().optional(),
  isSubscribed: z.boolean().optional(),
  customerStripeId: z.string().optional(),
});

// Тип для использования в коде
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
