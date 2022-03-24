export const blockPageScroll = () => {
  const body = document?.querySelector("body");
  body!.style.height = "100vh";
  body!.style.overflow = "hidden";
};

export const unblockPageScroll = () => {
  const body = document?.querySelector("body");
  body!.style.height = "auto";
  body!.style.overflow = "auto";
};
