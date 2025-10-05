"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUp } from "@/shared/lib";
import { ROUTES } from "@/shared/constants";

import { type FormSignUpSchema, formSignUpSchema } from "../utils";

export function useSignUp() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const router = useRouter();

  const handleToggleVisiblePassword = () =>
    setIsVisiblePassword((prevState) => !prevState);

  const form = useForm<FormSignUpSchema>({
    resolver: zodResolver(formSignUpSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormSignUpSchema) => {
    await signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Cadastro realizado com sucesso");
          router.push(ROUTES.SIGN_IN);
        },
        onError: (context) => {
          toast.error(context.error.message);
        },
      }
    );
  };

  return { form, isVisiblePassword, handleToggleVisiblePassword, onSubmit };
}
