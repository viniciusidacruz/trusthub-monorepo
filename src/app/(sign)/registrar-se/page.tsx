import Link from "next/link";

import { ROUTES } from "@/shared/constants";

import { Button } from "@/shared/components/external";
import { FormSignUp } from "./components/form-sign-up";

export default function SignIn() {
  return (
    <FormSignUp>
      <Button variant="secondary" className="w-full mt-4" size="lg" asChild>
        <Link href={ROUTES.SIGN_IN}>Já tem uma conta? Entrar</Link>
      </Button>
    </FormSignUp>
  );
}
