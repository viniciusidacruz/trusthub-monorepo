"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { ROUTES } from "@/shared/constants";
import { resetPassword } from "@/shared/lib";

import {
  type FormResetPasswordSchema,
  formResetPasswordSchema,
} from "../utils";

export function useResetPassword(token: string) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const handleToggleVisiblePassword = () =>
    setIsVisiblePassword((prevState) => !prevState);

  const router = useRouter();

  const form = useForm<FormResetPasswordSchema>({
    resolver: zodResolver(formResetPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormResetPasswordSchema) => {
    await resetPassword({
      newPassword: data.password,
      token,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Senha redefinida com sucesso!");
          router.push(ROUTES.SIGN_IN);
        },
        onError: (context) => {
          toast.error(context.error.message);
        },
      },
    });
  };

  return { form, isVisiblePassword, handleToggleVisiblePassword, onSubmit };
}
