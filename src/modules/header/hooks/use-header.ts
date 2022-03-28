import { POSITION_TOP } from "constants/header.constants";
import { useStore as useAuthStore } from "store/auth.store";
import { useStore } from "store/header.store";
import { blockPageScroll, unblockPageScroll } from "utils/page";

export const useHeader = () => {
  const { position, setFormAuthIsOpened, ...store } = useStore();
  const { setError } = useAuthStore();

  const headerIsAtTopPosition = position === POSITION_TOP;

  function openAuthForm() {
    blockPageScroll();
    setFormAuthIsOpened(true);
  }

  function closeAuthForm() {
    unblockPageScroll();
    setFormAuthIsOpened(false);
    setError(null);
  }

  return {
    openAuthForm,
    closeAuthForm,
    headerIsAtTopPosition,
    ...store,
  };
};
