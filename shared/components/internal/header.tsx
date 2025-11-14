import { Logo } from "./logo";
import { Navigation } from "./navigation";
import { MenuMobile } from "./menu-mobile";

export const Header = () => (
  <header className="flex items-center justify-between container mx-auto px-4 lg:px-0 py-4 mt-8 mb-14">
    <Logo />

    <Navigation />

    <MenuMobile />
  </header>
);
