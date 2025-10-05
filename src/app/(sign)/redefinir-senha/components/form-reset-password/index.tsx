"use client";

import * as CE from "@/shared/components/external";
import { useResetPassword } from "../../hooks";

export function FormResetPassword({ token }: { token: string }) {
  const { form, isVisiblePassword, handleToggleVisiblePassword, onSubmit } =
    useResetPassword(token);

  return (
    <CE.Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-md"
      >
        <CE.FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <CE.FormItem>
              <CE.FormLabel>Nova senha</CE.FormLabel>
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
              <CE.FormLabel>Confirmar nova senha</CE.FormLabel>
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
          aria-label="Redefinir senha"
          disabled={!form.formState.isValid}
          isLoading={form.formState.isSubmitting}
        >
          Redefinir senha
        </CE.Button>
      </form>
    </CE.Form>
  );
}
