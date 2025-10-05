"use client";

import * as CE from "@/shared/components/external";
import { useForgotPassword } from "../../hooks";

export function FormForgotPassword() {
  const { form, onSubmit } = useForgotPassword();

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

        <CE.Button
          size="lg"
          type="submit"
          className="w-full"
          aria-label="Enviar email"
          isLoading={form.formState.isSubmitting}
          disabled={!form.formState.isValid}
        >
          Enviar email
        </CE.Button>
      </form>
    </CE.Form>
  );
}
