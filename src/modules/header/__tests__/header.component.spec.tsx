/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from "utils/test-utils";
import { Header } from "../header.component";
import * as useHeader from "../hooks/use-header";

jest.mock("modules/auth/auth-form.component", () => ({
  AuthForm: () => <div />,
}));
jest.mock("modules/auth/auth-btns.component", () => ({
  AuthBtns: () => <div data-testid="auth-form" />,
}));

describe("Header", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("renders correctly", () => {
    expect(document.body).toMatchSnapshot();
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("changes toolbar position to bottom and to top again", () => {
    const changeToolbarPositionBtn = screen.getByTestId(
      "change-header-position-btn"
    );

    fireEvent.click(changeToolbarPositionBtn);
    const headerBottomStyles = window.getComputedStyle(
      screen.getByTestId("header")
    );
    expect(headerBottomStyles.bottom).toBe("20px");
    expect(headerBottomStyles.top).toBe("");
    expect(screen.getByTestId("ArrowCircleUpIcon")).toBeInTheDocument();

    fireEvent.click(changeToolbarPositionBtn);
    const headerTopStyles = window.getComputedStyle(
      screen.getByTestId("header")
    );
    expect(headerTopStyles.bottom).toBe("");
    expect(headerTopStyles.top).toBe("0px");
    expect(screen.getByTestId("ArrowCircleDownIcon")).toBeInTheDocument();
  });

  describe("when auth form is opened", () => {
    beforeAll(() => {
      jest.spyOn(useHeader, "useHeader").mockImplementation(() => ({
        ...jest.requireActual("modules/header/hooks/use-header"),
        authFormIsOpened: true,
      }));
    });

    it("header is fullscreen", () => {
      const headerStyles = window.getComputedStyle(
        screen.getByTestId("header")
      );
      expect(headerStyles.height).toBe("100vh");
    });

    it("renders auth form", () => {
      expect(screen.getByTestId("auth-form")).toBeInTheDocument();
    });
  });
});
