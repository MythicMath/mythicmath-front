import { z } from "zod";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "IDENTIFIER_REQUIRED")
    .refine((value) => {
      if (!value) return true;

      if (value.includes("@")) {
        return emailRegex.test(value);
      }

      return value.length >= 2;
    }, "INVALID_IDENTIFIER"),

  password: z
    .string()
    .min(6, "PASSWORD_MIN_LENGTH"),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, "USERNAME_REQUIRED"),

    email: z
      .string()
      .email("INVALID_EMAIL_FORMAT"),

    password: z
      .string()
      .min(6, "PASSWORD_MIN_LENGTH"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "PASSWORDS_DO_NOT_MATCH",
    path: ["confirmPassword"],
  });

export const updateUserSchema = z
  .object({
    email: z
      .string()
      .email("INVALID_EMAIL_FORMAT")
      .optional()
      .or(z.literal("")),

    password: z
      .string()
      .min(6, "PASSWORD_MIN_LENGTH")
      .optional()
      .or(z.literal("")),

    confirmPassword: z
      .string()
      .optional()
      .or(z.literal("")),

    currentPassword: z
      .string()
      .min(1, "CURRENT_PASSWORD_REQUIRED")
      .min(6, "CURRENT_PASSWORD_MIN_LENGTH"),
  })

  // At least one field (email or password)
  .refine(
    (data) => {
      const hasEmail = data.email && data.email !== "";
      const hasPassword = data.password && data.password !== "";
      return hasEmail || hasPassword;
    },
    {
      message: "AT_LEAST_ONE_FIELD_REQUIRED",
      path: ["email"],
    },
  )

  // Passwords must match
  .refine(
    (data) => {
      if (data.password && data.password !== "") {
        return data.password === data.confirmPassword;
      }

      return true;
    },
    {
      message: "PASSWORDS_DO_NOT_MATCH",
      path: ["confirmPassword"],
    },
  );

export type FormDataRegister = z.infer<typeof registerSchema>;
export type FormDataLogin = z.infer<typeof loginSchema>;
export type FormDataUpdateUser = z.infer<typeof updateUserSchema>;