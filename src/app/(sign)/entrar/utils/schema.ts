import { z } from "zod";

export const formSignInSchema = z.object({
  email: z.email({
    message: "Email inválido",
  }),
  password: z
    .string({
      message: "Senha inválida",
    })
    .min(1, {
      message: "Senha é obrigatória",
    }),
});

export type FormSignInSchema = z.infer<typeof formSignInSchema>;
