import { Logo } from "./logo";
import { Navigation } from "./navigation";

export const Header = () => (
  <header className="flex items-center justify-between container mx-auto py-4 mt-8 mb-14">
    <Logo />

    <Navigation />
  </header>
);
