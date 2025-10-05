import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/shared/lib";
import { ROUTES } from "@/shared/constants";
import { AnimationX } from "@/shared/components/internal";

export default async function SignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(ROUTES.DASHBOARD);
  }

  return (
    <main className="min-h-screen w-full flex">
      <section className="flex flex-col items-center justify-center flex-1 px-8">
        <AnimationX direction="right">
          <h1 className="text-4xl font-bold text-center mb-8">
            Insira seus dados <br /> para{" "}
            <strong className="text-primary">continuar</strong>
          </h1>
          {children}
        </AnimationX>
      </section>

      <section className="hidden md:flex flex-col items-center justify-center bg-primary w-2/5">
        <AnimationX direction="left">
          <div className="flex items-center gap-2">
            <h3 className="text-4xl font-bold text-white">TrustHub</h3>
            <div className="h-2 w-2 bg-white rounded-full" />
            <h4 className="text-white">Confiança em um só lugar.</h4>
          </div>
        </AnimationX>
      </section>
    </main>
  );
}
