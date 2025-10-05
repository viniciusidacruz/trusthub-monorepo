import Link from "next/link";
import { Fragment } from "react";
import type { Metadata } from "next";

import { METADATA, ROUTES } from "@/shared/constants";

import { Button } from "@/shared/components/external";
import { FormSignUp } from "./components/form-sign-up";

export const metadata: Metadata = {
  title: `Registrar-se | ${METADATA.title}`,
};

export default function SignIn() {
  return (
    <Fragment>
      <h1 className="text-4xl font-bold text-center mb-8">
        Insira seus dados <br /> para{" "}
        <strong className="text-primary">continuar</strong>
      </h1>

      <FormSignUp />

      <Button variant="secondary" className="w-full mt-4" size="lg" asChild>
        <Link href={ROUTES.SIGN_IN}>Já tem uma conta? Entrar</Link>
      </Button>
    </Fragment>
  );
}
