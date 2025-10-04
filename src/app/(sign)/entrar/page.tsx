import Link from "next/link";
import { FormSignIn } from "./components/form-sign-in";
import { Button } from "@/shared/components/external";

export default function SignIn() {
  return (
    <FormSignIn>
      <Button variant="secondary" className="w-full mt-4" size="lg" asChild>
        <Link href="/registrar-se">Cadastre-se</Link>
      </Button>
    </FormSignIn>
  );
}
