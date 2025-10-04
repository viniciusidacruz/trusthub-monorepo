"use client";

import * as CE from "@/shared/components/external";

import type { FormSignInProps } from "./types";
import { useSignIn } from "../../hooks/use-sign-in";

export function FormSignIn({ children }: FormSignInProps) {
  const { form, isVisiblePassword, handleToggleVisiblePassword, onSubmit } =
    useSignIn();

  return (
    <CE.Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <CE.FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <CE.FormItem>
              <CE.FormLabel>Email</CE.FormLabel>
              <CE.FormControl>
                <CE.Input placeholder="Digite seu email" {...field} />
              </CE.FormControl>
              <CE.FormMessage />
            </CE.FormItem>
          )}
        />

        <CE.FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <CE.FormItem>
              <CE.FormLabel>Senha</CE.FormLabel>
              <CE.FormControl>
                <CE.Input
                  placeholder="Digite sua senha"
                  type={isVisiblePassword ? "text" : "password"}
                  {...field}
                />
              </CE.FormControl>

              <CE.FormMessage />

              <CE.Button
                type="button"
                variant="ghost"
                className="w-fit px-0"
                onClick={handleToggleVisiblePassword}
              >
                {isVisiblePassword ? "Ocultar" : "Mostrar"} senha
              </CE.Button>
            </CE.FormItem>
          )}
        />

        <CE.Button
          size="lg"
          type="submit"
          className="w-full"
          aria-label="Entrar"
          isLoading={form.formState.isSubmitting}
        >
          Entrar
        </CE.Button>
      </form>

      {children}
    </CE.Form>
  );
}
