"use client";

import type { User } from "better-auth";
import { useShallow } from "zustand/shallow";

import { useAppStore } from "@/shared/stores";
import { truncateWithEllipsis } from "@/shared/utils";

export function SidebarInformation({ user }: { user: User }) {
  const isOpenSidebar = useAppStore(useShallow((state) => state.isOpenSidebar));

  if (!isOpenSidebar) return null;

  const name = truncateWithEllipsis(user.name, 15);
  const email = truncateWithEllipsis(user.email, 15);

  return (
    <div className="flex flex-col">
      <span className="text-base font-medium text-white" title={user.name}>
        {name}
      </span>
      <span className="text-sm text-white" title={user.email}>
        {email}
      </span>
    </div>
  );
}
