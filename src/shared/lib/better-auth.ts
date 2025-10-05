import { APIError, betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "./prisma";
import { sendEmailAction } from "@/app/(sign)/entrar/actions/send-email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  //   sendResetPassword: async ({ user, url }) => {
  //     // await sendEmailAction({
  //     //   to: user.email,
  //     //   subject: "Reset your password",
  //     //   meta: {
  //     //     description: "Por favor, clique no link abaixo para resetar sua senha",
  //     //     link: url,
  //     //   }
  //     // });
  //   },
  // },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60, // 1 hour
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: "Verifique seu email",
        meta: {
          description:
            "Por favor, clique no link abaixo para verificar seu email",
          link: String(url),
        },
      });
    },
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const path = ctx.path;
      const response = ctx.context.returned as APIError;

      const isSignUp = path.startsWith("/sign-up");

      if (
        isSignUp &&
        response.body?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
      ) {
        throw new APIError("BAD_REQUEST", {
          ...response.body,
          message: "Usuário já cadastrado",
        });
      }

      const isSignIn = path.startsWith("/sign-in");

      if (isSignIn && response.body?.code === "INVALID_EMAIL_OR_PASSWORD") {
        throw new APIError("UNAUTHORIZED", {
          ...response.body,
          message: "Email ou senha inválidos",
        });
      }

      if (isSignIn && response.body?.code === "EMAIL_NOT_VERIFIED") {
        throw new APIError("UNAUTHORIZED", {
          ...response.body,
          message: "Email não verificado",
        });
      }

      if (
        (isSignIn || isSignUp) &&
        response.status === "INTERNAL_SERVER_ERROR"
      ) {
        throw new APIError("INTERNAL_SERVER_ERROR", {
          ...response.body,
          message: "Ops, alguma instabilidade no momento! Tente novamente.",
        });
      }
    }),
  },
});
