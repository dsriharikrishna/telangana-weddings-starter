import { z } from "zod";

export const phoneSchema = z
  .string()
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number cannot exceed 15 digits")
  .regex(/^[+0-9\s-]+$/, "Please enter a valid phone number");

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

export const otpSchema = z
  .string()
  .min(4, "Passcode must be at least 4 digits")
  .max(6, "Passcode cannot exceed 6 digits")
  .regex(/^[0-9]+$/, "Passcode must contain digits only");

