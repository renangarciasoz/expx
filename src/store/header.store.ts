import { POSITION_BOTTOM, POSITION_TOP } from "constants/header.constants";
import create from "zustand";

type HeaderPosition = {
  position: typeof POSITION_TOP | typeof POSITION_BOTTOM;
  authFormIsOpened: boolean;
  changeHeaderPosition: (
    position: typeof POSITION_TOP | typeof POSITION_BOTTOM
  ) => void;
  setFormAuthIsOpened: (isOpened: boolean) => void;
};

export const useStore = create<HeaderPosition>((set) => ({
  position: POSITION_TOP,
  authFormIsOpened: false,
  changeHeaderPosition: (
    position: typeof POSITION_TOP | typeof POSITION_BOTTOM
  ) => {
    set({ position });
  },
  setFormAuthIsOpened: (isOpened: boolean) => {
    set({
      authFormIsOpened: isOpened,
    });
  },
}));
