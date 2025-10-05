import { z } from "zod";

export const formForgotPasswordSchema = z.object({
  email: z.email({
    message: "Email inválido",
  }),
});

export type FormForgotPasswordSchema = z.infer<typeof formForgotPasswordSchema>;
