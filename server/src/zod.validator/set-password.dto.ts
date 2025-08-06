import { z } from "zod";

export const setUsersFieldsSchema = z.object({
  actionToken: z.string(),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(32)
    .optional(),
});

export type setUsersFieldsSchema = z.infer<typeof setUsersFieldsSchema>;
