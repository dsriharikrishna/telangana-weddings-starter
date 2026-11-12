import { z } from "zod";
import { emailSchema, phoneSchema, otpSchema } from "@/lib/validations/common.schema";

export const adminLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

export const adminRegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: emailSchema,
  phone: phoneSchema,
  role: z.enum(["support", "moderator", "finance"]),
});

export type AdminRegisterFormValues = z.infer<typeof adminRegisterSchema>;

export const adminVerifyOtpSchema = z.object({
  phone: phoneSchema,
  code: otpSchema,
});

export type AdminVerifyOtpFormValues = z.infer<typeof adminVerifyOtpSchema>;

