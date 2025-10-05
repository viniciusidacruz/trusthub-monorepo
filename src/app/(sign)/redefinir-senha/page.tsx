import Link from "next/link";
import { Fragment } from "react";

import { ROUTES } from "@/shared/constants";
import { Button } from "@/shared/components/external";
import { FormResetPassword } from "./components/form-reset-password";
import { redirect } from "next/navigation";

interface ResetPasswordProps {
  searchParams: {
    token: string;
  };
}

export default async function ResetPassword({
  searchParams,
}: ResetPasswordProps) {
  const { token } = await searchParams;

  if (!token) {
    return redirect(ROUTES.SIGN_IN);
  }

  return (
    <Fragment>
      <h1 className="text-4xl font-bold text-center mb-8">
        Redefina sua <br />
        <strong className="text-primary">senha</strong>
      </h1>

      <FormResetPassword token={token} />

      <Button variant="secondary" className="w-full mt-4" size="lg" asChild>
        <Link href={ROUTES.SIGN_IN}>Voltar para o login</Link>
      </Button>
    </Fragment>
  );
}
