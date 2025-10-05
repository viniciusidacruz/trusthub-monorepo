import Link from "next/link";
import { Fragment } from "react";

import { ROUTES } from "@/shared/constants";
import { Button } from "@/shared/components/external";
import { FormForgotPassword } from "./components/form-forgot-password";

export default function ForgotPassword() {
  return (
    <Fragment>
      <h1 className="text-4xl font-bold text-center mb-8">
        Entre com seu email <br /> para{" "}
        <strong className="text-primary">resetar sua senha</strong>
      </h1>

      <FormForgotPassword />

      <Button variant="secondary" className="w-full mt-4" size="lg" asChild>
        <Link href={ROUTES.SIGN_IN}>Voltar para o login</Link>
      </Button>
    </Fragment>
  );
}
