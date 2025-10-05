"use client";

import { toast } from "sonner";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";
import { ChevronsLeft, ChevronsRight, LogOut } from "lucide-react";

import { cn, signOut } from "@/shared/lib";
import { ROUTES } from "@/shared/constants";
import { useAppStore } from "@/shared/stores";

import { Button } from "@/shared/components/external";

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const { isOpenSidebar, toggleSidebar } = useAppStore(
    useShallow((state) => ({
      isOpenSidebar: state.isOpenSidebar,
      toggleSidebar: state.toggleSidebar,
    })),
  );

  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);

    await signOut({
      fetchOptions: {
        onError: (context) => {
          toast.error(context.error.message);
        },
        onSuccess: () => {
          router.push(ROUTES.SIGN_IN);
        },
        onResponse: () => {
          setIsLoading(false);
        },
      },
    });
  };

  return (
    <aside
      className={cn(
        isOpenSidebar ? "w-64 " : "w-[106px]",
        "transition-ease-in-out items-start duration-300 h-screen fixed top-0 left-0 z-50 bg-primary border-r border-zinc-300 flex flex-col p-6",
      )}
    >
      {children}

      <button
        type="button"
        onClick={toggleSidebar}
        title="Abrir/Fechar menu lateral"
        className="mt-auto absolute bottom-6 -right-6 bg-white text-primary rounded-full p-2"
      >
        {isOpenSidebar ? (
          <ChevronsLeft className="size-6" />
        ) : (
          <ChevronsRight className="size-6" />
        )}
      </button>

      <Button
        title="Sair"
        type="button"
        disabled={isLoading}
        onClick={handleLogout}
        className="mt-auto p-4 flex items-center gap-4 text-base"
      >
        {isLoading ? (
          "Saindo..."
        ) : (
          <Fragment>
            <LogOut className="size-6" /> {isOpenSidebar && "Sair"}
          </Fragment>
        )}
      </Button>
    </aside>
  );
}
