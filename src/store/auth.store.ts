import { User } from "@types";
import create from "zustand";

type AuthStore = {
  user: User | null;
  error: string | null;
  setError: (error: string | null) => void;
  setUser: (user: User) => void;
  removeUser: () => void;
};

export const useStore = create<AuthStore>((set) => ({
  user: null,
  error: null,
  isAuthenticated: false,
  setError: (error: string | null) => {
    set({ error });
  },
  setUser: (user: User) => {
    set({ user });
  },
  removeUser: () => {
    set({ user: null });
  },
}));
