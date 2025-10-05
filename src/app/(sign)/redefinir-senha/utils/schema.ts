import { z } from "zod";

export const formResetPasswordSchema = z
  .object({
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
        },
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

export type FormResetPasswordSchema = z.infer<typeof formResetPasswordSchema>;
