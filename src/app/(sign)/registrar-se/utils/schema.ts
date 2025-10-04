import { z } from "zod";

export const formSignUpSchema = z
  .object({
    name: z
      .string({
        message: "Nome inválido",
      })
      .min(1, {
        message: "Nome é obrigatório",
      })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Nome deve conter apenas letras",
      })
      .transform((value) => value.trim()),
    email: z
      .email({
        message: "Email inválido",
      })
      .transform((value) => value.trim()),
    password: z
      .string({
        message: "Senha inválida",
      })
      .min(1, {
        message: "Senha é obrigatória",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
        }
      ),
    confirmPassword: z
      .string({
        message: "Confirmar senha inválida",
      })
      .min(1, {
        message: "Confirmar senha é obrigatória",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type FormSignUpSchema = z.infer<typeof formSignUpSchema>;
