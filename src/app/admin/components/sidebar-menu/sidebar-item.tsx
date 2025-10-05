"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useShallow } from "zustand/shallow";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/lib";
import { useAppStore } from "@/shared/stores";

interface SidebarItemProps {
  href: string;
  title: string;
  icon: ReactNode;
}

export function SidebarItem({ title, href, icon }: SidebarItemProps) {
  const isOpenSidebar = useAppStore(useShallow((state) => state.isOpenSidebar));

  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="w-full" title={title}>
      <Link
        href={href}
        className={cn(
          "p-4 rounded-md flex items-center gap-2 hover:text-white",
          !isOpenSidebar && "justify-center",
          isActive ? "text-white" : "text-blue-200",
        )}
      >
        {icon}

        {isOpenSidebar && <span className="text-sm font-medium">{title}</span>}
      </Link>
    </li>
  );
}
