import { z } from "zod";

export const updateUsersFieldsSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).optional(),
  id: z.number().optional(),
});

export type UpdateUsersFieldsDto = z.infer<typeof updateUsersFieldsSchema>;

