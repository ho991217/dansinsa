import { create } from "zustand";

interface loginState {
  loggedIn: boolean;
  setLoggedIn: (newState: boolean) => void;
}

export const useLoginState = create<loginState>((set) => ({
  loggedIn: false,
  setLoggedIn: (newState) => set({ loggedIn: newState }),
}));
