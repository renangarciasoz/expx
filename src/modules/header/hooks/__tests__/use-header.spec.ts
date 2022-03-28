/**
 * @jest-environment jsdom
 */

import { act, renderHook } from "@testing-library/react-hooks";
import { POSITION_BOTTOM, POSITION_TOP } from "constants/header.constants";
import { useStore as useAuthStore } from "store/auth.store";
import { useStore } from "store/header.store";
import { useHeader } from "../use-header";

describe("useHeader hook", () => {
  const { result: resultHeaderStory } = renderHook(() => useStore());
  const { result: resultAuthStory } = renderHook(() => useAuthStore());

  const { result } = renderHook(() => useHeader());

  it("does change header position", () => {
    act(() => {
      result.current.changeHeaderPosition(POSITION_BOTTOM);
    });

    expect(result.current.headerIsAtTopPosition).toBe(false);

    act(() => {
      result.current.changeHeaderPosition(POSITION_TOP);
    });

    expect(result.current.headerIsAtTopPosition).toBe(true);
  });

  it("does open auth form", () => {
    act(() => {
      result.current.openAuthForm();
    });

    expect(resultHeaderStory.current.authFormIsOpened).toBe(true);
  });

  it("does close auth form", () => {
    act(() => {
      result.current.closeAuthForm();
    });

    expect(resultHeaderStory.current.authFormIsOpened).toBe(false);
    expect(resultAuthStory.current.error).toBe(null);
  });
});
