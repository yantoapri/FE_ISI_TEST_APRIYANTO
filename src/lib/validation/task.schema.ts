import { z } from "zod";

export const TaskSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(20, "Title min 20 character"),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(50, "Description min min 50 character"),
  status: z.string().optional(),
});
export type TaskInput = z.infer<typeof TaskSchema>;
