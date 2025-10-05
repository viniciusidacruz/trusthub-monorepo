import type { User } from "better-auth";
import { Home, Lightbulb, MessageCircle, User as UserIcon } from "lucide-react";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/external";

import { ROUTES } from "@/shared/constants";

import { SidebarItem } from "./sidebar-item";
import { SidebarWrapper } from "./sidebar-wrapper";
import { SidebarInformation } from "./sidebar-information";

export function SidebarMenu({ user }: { user: User }) {
  return (
    <SidebarWrapper>
      <div className="flex items-center gap-3">
        <Avatar className="size-14 text-2xl">
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <SidebarInformation user={user} />
      </div>

      <ul className="mt-11 w-full space-y-6">
        <SidebarItem
          title="Inicio"
          href={ROUTES.DASHBOARD}
          icon={<Home className="size-6" />}
        />

        <SidebarItem
          title="Perfil"
          href={ROUTES.PROFILE}
          icon={<UserIcon className="size-6" />}
        />

        <SidebarItem
          title="Mensagens"
          href={ROUTES.MESSAGES}
          icon={<MessageCircle className="size-6" />}
        />

        <SidebarItem
          title="Sugestões"
          href={ROUTES.SUGGESTIONS}
          icon={<Lightbulb className="size-6" />}
        />
      </ul>
    </SidebarWrapper>
  );
}
