import { z } from "zod";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Nome ou e-mail é obrigatório")
    .refine((value) => {
      if (!value) return true;

      if (value.includes("@")) {
        return emailRegex.test(value);
      }

      return value.length >= 2;
    }, "Digite um nome ou e-mail válido"),

  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.string().email("Digite um e-mail válido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type FormDataRegister = z.infer<typeof registerSchema>;
export type FormDataLogin = z.infer<typeof loginSchema>;
