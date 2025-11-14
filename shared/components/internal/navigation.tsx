import Link from "next/link";

import { LINKS, ROUTES } from "@/shared/constants";
import { Button } from "@/shared/components/external";

export const Navigation = () => (
  <nav className="flex items-center gap-10">
    <ul className="flex items-center gap-4">
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

    <div className="flex items-center gap-4">
      <Button asChild>
        <Link href={ROUTES.LOGIN}>Dê seu feedback</Link>
      </Button>

      <Button variant="outline" asChild>
        <Link href={ROUTES.LOGIN}>Entrar</Link>
      </Button>
    </div>
  </nav>
);
