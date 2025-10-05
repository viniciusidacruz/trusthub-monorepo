import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { subscribeWithSelector } from "zustand/middleware";

import { sidebarSlice, type SidebarSlice } from "./slices/sidebar";

type Store = SidebarSlice;

export const useAppStore = create<Store>()(
  devtools(
    persist(subscribeWithSelector(sidebarSlice), {
      name: "app-storage",
    }),
    { name: "AppStore" },
  ),
);
