import { APIError, betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const path = ctx.path;
      const response = ctx.context.returned as APIError;

      const isSignUp =
        path.startsWith("/sign-up") &&
        response.body?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL";

      if (isSignUp) {
        throw new APIError("BAD_REQUEST", {
          ...response.body,
          message: "Usuário já cadastrado",
        });
      }

      const isSignIn =
        path.startsWith("/sign-in") &&
        response.body?.code === "INVALID_EMAIL_OR_PASSWORD";

      if (isSignIn) {
        throw new APIError("UNAUTHORIZED", {
          ...response.body,
          message: "Email ou senha inválidos",
        });
      }

      const anyError = response?.body?.code === "BAD_REQUEST";

      if (anyError) {
        throw new APIError("BAD_REQUEST", {
          ...response.body,
          message: "Erro ao processar a requisição",
        });
      }
    }),
  },
});
