"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type FormSignUpSchema, formSignUpSchema } from "../utils";

export function useSignUp() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const handleToggleVisiblePassword = () =>
    setIsVisiblePassword((prevState) => !prevState);

  const form = useForm<FormSignUpSchema>({
    resolver: zodResolver(formSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormSignUpSchema) => {
    console.log(data);
  };

  return { form, isVisiblePassword, handleToggleVisiblePassword, onSubmit };
}
