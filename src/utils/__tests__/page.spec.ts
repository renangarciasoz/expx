/**
 * @jest-environment jsdom
 */

import { blockPageScroll, unblockPageScroll } from "../page";

describe("page utility", () => {
  it("block page scroll", async () => {
    blockPageScroll();

    const body = document.querySelector("body");
    const bodyStyle = body!.style;
    expect(bodyStyle.height).toBe("100vh");
    expect(bodyStyle.overflow).toBe("hidden");
  });

  it("unblock page scroll", () => {
    unblockPageScroll();

    const body = document.querySelector("body");
    const bodyStyle = body!.style;
    expect(bodyStyle.height).toBe("auto");
    expect(bodyStyle.overflow).toBe("auto");
  });
});
