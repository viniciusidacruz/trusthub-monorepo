import Link from "next/link";
import Image from "next/image";

export const Logo = () => (
  <Link href="/" className="flex items-end gap-1">
    <Image src="/assets/svg/logo-icon.svg" alt="Logo" width={50} height={50} />
    <span className="text-2xl">
      Trust<span className="font-bold">Hub</span>
    </span>
  </Link>
);
