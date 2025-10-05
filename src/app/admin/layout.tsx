import { ROUTES } from "@/shared/constants";
import { auth } from "@/shared/lib";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarMenu } from "./components/sidebar-menu";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(ROUTES.SIGN_IN);
  }

  return (
    <main>
      <SidebarMenu user={session.user} />
      {children}
    </main>
  );
}
