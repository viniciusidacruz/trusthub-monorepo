"use client";

import * as CE from "@/shared/components/external";

import type { FormSignUpProps } from "./types";
import { useSignUp } from "../../hooks";

export function FormSignUp({ children }: FormSignUpProps) {
  const { form, isVisiblePassword, handleToggleVisiblePassword, onSubmit } =
    useSignUp();

  return (
    <CE.Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-md"
      >
        <CE.FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <CE.FormItem>
              <CE.FormLabel>Nome</CE.FormLabel>
              <CE.FormControl>
                <CE.Input placeholder="Digite seu nome" {...field} />
              </CE.FormControl>
              <CE.FormMessage />
            </CE.FormItem>
          )}
        />

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
            </CE.FormItem>
          )}
        />

        <CE.FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <CE.FormItem>
              <CE.FormLabel>Confirmar senha</CE.FormLabel>
              <CE.FormControl>
                <CE.Input
                  placeholder="Digite sua senha novamente"
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
          aria-label="Cadastrar"
          disabled={!form.formState.isValid}
          isLoading={form.formState.isSubmitting}
        >
          Cadastrar
        </CE.Button>
      </form>

      {children}
    </CE.Form>
  );
}
