import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

import { type SidebarSlice, sidebarSlice } from "./slices/sidebar";

type Store = SidebarSlice;

export const useAppStore = create<Store>()(
  devtools(
    persist(subscribeWithSelector(sidebarSlice), {
      name: "app-storage",
    }),
    { name: "AppStore" }
  )
);
