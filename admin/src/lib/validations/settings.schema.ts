import { z } from "zod";
import { emailSchema, phoneSchema } from "@/lib/validations/common.schema";

export const adminSettingsSchema = z.object({
  officialHelpline: phoneSchema,
  whatsappNumber: phoneSchema,
  publicEmail: emailSchema,
  listingFeePaise: z.coerce.number().min(0, "Fee cannot be negative"),
});

export type AdminSettingsFormValues = z.infer<typeof adminSettingsSchema>;

