import { create, StateCreator } from "zustand";

interface State {
  isOpenSidebar: boolean;
}

interface Actions {
  toggleSidebar: () => void;
}

export type SidebarSlice = State & Actions;

export const sidebarSlice: StateCreator<SidebarSlice> = (set) => ({
  isOpenSidebar: false,
  toggleSidebar: () =>
    set((state) => ({ isOpenSidebar: !state.isOpenSidebar })),
});
