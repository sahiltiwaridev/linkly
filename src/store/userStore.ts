import { create } from "zustand";
import { getUser } from "../lib/storage/user.storage";

type UserStore = {
  hasAccount: boolean;
  isUserInitialized: boolean;
  setHasAccount: (hasAccount: boolean) => void;
  initialize: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  hasAccount: false,
  isUserInitialized: false,

  setHasAccount: (hasAccount) => set({ hasAccount }),

  initialize: () => {
    const user = getUser();
    set({ hasAccount: !!user, isUserInitialized: true });
  },
}));