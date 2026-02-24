import { z } from "zod";
import { COKE_TYPES, FORMATS } from "@/lib/constants/coke-types";

export const createCokeLogSchema = z.object({
  cokeType: z.enum(COKE_TYPES, {
    message: "Please select a valid coke type",
  }),
  format: z.enum(FORMATS, {
    message: "Please select a valid format",
  }),
  sizeML: z.number().int().positive({
    message: "Size must be a positive number",
  }).max(10000, {
    message: "Size seems unrealistic (max 10L)",
  }),
  notes: z.string().max(250, {
    message: "Notes must be 250 characters or less",
  }).optional(),
  imageUrl: z.string().url().optional(),
  consumedAt: z.date({
    message: "Please select when you consumed the coke",
  }).refine(
    (date) => date <= new Date(),
    { message: "Consumed date cannot be in the future" }
  ),
  isPublic: z.boolean().default(false),
});

export const updateCokeLogSchema = createCokeLogSchema.partial();

export type CreateCokeLogInput = z.infer<typeof createCokeLogSchema>;
export type UpdateCokeLogInput = z.infer<typeof updateCokeLogSchema>;
