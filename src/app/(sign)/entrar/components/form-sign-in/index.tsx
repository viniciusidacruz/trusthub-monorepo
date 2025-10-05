"use client";

import Link from "next/link";

import { ROUTES } from "@/shared/constants";
import * as CE from "@/shared/components/external";

import { useSignIn } from "../../hooks";

export function FormSignIn() {
  const { form, isVisiblePassword, handleToggleVisiblePassword, onSubmit } =
    useSignIn();

  return (
    <CE.Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-md"
      >
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

              <div className="w-full flex items-center gap-4 justify-between">
                <CE.Button
                  type="button"
                  variant="ghost"
                  className="w-fit px-0"
                  onClick={handleToggleVisiblePassword}
                >
                  {isVisiblePassword ? "Ocultar" : "Mostrar"} senha
                </CE.Button>

                <CE.Button variant="ghost" className="w-fit px-0" asChild>
                  <Link href={ROUTES.FORGOT_PASSWORD}>Esqueceu sua senha?</Link>
                </CE.Button>
              </div>
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
    </CE.Form>
  );
}
