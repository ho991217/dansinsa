import { create } from "zustand";

interface vtonOnState {
  vtonOn: boolean;
  setVtonOn: (newState: boolean) => void;
}

export const useVtonOnState = create<vtonOnState>((set) => ({
  vtonOn: false,
  setVtonOn: (newState) => set({ vtonOn: newState }),
}));
