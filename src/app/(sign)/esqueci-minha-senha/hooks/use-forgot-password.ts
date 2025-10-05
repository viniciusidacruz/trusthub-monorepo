"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { ROUTES } from "@/shared/constants";
import { forgetPassword, signUp } from "@/shared/lib";

import {
  type FormForgotPasswordSchema,
  formForgotPasswordSchema,
} from "../utils";

export function useForgotPassword() {
  const router = useRouter();

  const form = useForm<FormForgotPasswordSchema>({
    resolver: zodResolver(formForgotPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormForgotPasswordSchema) => {
    await forgetPassword(data, {
      onSuccess: () => {
        toast.success("Email enviado com sucesso");
        router.push(ROUTES.SIGN_IN);
      },
      onError: (context) => {
        toast.error(context.error.message);
      },
    });
  };

  return { form, onSubmit };
}
