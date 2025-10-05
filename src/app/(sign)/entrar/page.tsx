import Link from "next/link";
import { Fragment } from "react";
import type { Metadata } from "next";

import { METADATA, ROUTES } from "@/shared/constants";

import { Button } from "@/shared/components/external";
import { FormSignIn } from "./components/form-sign-in";

export const metadata: Metadata = {
  title: `Entrar | ${METADATA.title}`,
};

export default function SignIn() {
  return (
    <Fragment>
      <h1 className="text-4xl font-bold text-center mb-8">
        Insira seus dados <br /> para{" "}
        <strong className="text-primary">continuar</strong>
      </h1>

      <FormSignIn />

      <Button variant="secondary" className="w-full mt-4" size="lg" asChild>
        <Link href={ROUTES.SIGN_UP}>Não tem uma conta? Cadastre-se</Link>
      </Button>
    </Fragment>
  );
}
