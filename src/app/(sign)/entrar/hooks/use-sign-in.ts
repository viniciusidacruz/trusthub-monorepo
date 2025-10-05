"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ROUTES } from "@/shared/constants";
import { signIn } from "@/shared/lib";

import { type FormSignInSchema, formSignInSchema } from "../utils";

export function useSignIn() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const router = useRouter();

  const handleToggleVisiblePassword = () =>
    setIsVisiblePassword((prevState) => !prevState);

  const form = useForm<FormSignInSchema>({
    resolver: zodResolver(formSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormSignInSchema) => {
    await signIn.email(data, {
      onSuccess: () => {
        toast.success("Login realizado com sucesso");
        router.push(ROUTES.DASHBOARD);
      },
      onError: (context) => {
        toast.error(context.error.message);
      },
    });
  };

  return { form, isVisiblePassword, handleToggleVisiblePassword, onSubmit };
}
