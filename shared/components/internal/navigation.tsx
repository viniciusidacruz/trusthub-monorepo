import Link from "next/link";

import { cn } from "@/shared/utils";
import { LINKS, ROUTES } from "@/shared/constants";

import { Button } from "@/shared/components/external";

interface NavigationProps {
  isMobile?: boolean;
}

export const Navigation = ({ isMobile = false }: NavigationProps) => (
  <nav
    className={cn(
      "items-center gap-10 flex",
      isMobile ? "flex-col h-full py-10" : "flex-row hidden lg:flex"
    )}
  >
    <ul
      className={cn(
        "flex items-center",
        isMobile ? "flex-col gap-10" : "flex-row gap-4"
      )}
    >
      {LINKS.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="px-10 py-2.5 hover:border-b text-xl"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>

    <div
      className={cn(
        "flex items-center gap-4",
        isMobile ? "flex-col mt-auto" : "flex-row"
      )}
    >
      <Button className={cn(isMobile ? "w-full" : "w-fit")} asChild>
        <Link href={ROUTES.LOGIN}>Dê seu feedback</Link>
      </Button>

      <Button
        className={cn(isMobile ? "w-full" : "w-fit")}
        variant="outline"
        asChild
      >
        <Link href={ROUTES.LOGIN}>Entrar</Link>
      </Button>
    </div>
  </nav>
);
