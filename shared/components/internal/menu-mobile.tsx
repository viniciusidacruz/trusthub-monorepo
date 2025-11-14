import { MenuIcon } from "lucide-react";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/shared/components/external";
import { Navigation } from "@/shared/components/internal";

export const MenuMobile = () => (
  <Sheet>
    <SheetTrigger className="lg:hidden">
      <MenuIcon className="size-6" />
    </SheetTrigger>

    <SheetContent>
      <SheetHeader>
        <SheetTitle>Acesso rápido</SheetTitle>
      </SheetHeader>

      <Navigation isMobile />
    </SheetContent>
  </Sheet>
);
