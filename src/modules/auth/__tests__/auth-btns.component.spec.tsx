/**
 * @jest-environment jsdom
 */

import user from "@fixtures/user.json";
import * as useAuth from "modules/auth/hooks/use-auth";
import * as useHeader from "modules/header/hooks/use-header";
import { fireEvent, render, screen } from "utils/test-utils";
import { AuthBtns } from "../auth-btns.component";

const useAuthSpy = jest.spyOn(useAuth, "useAuth");
() => ({
  ...jest.requireActual("modules/auth/hooks/use-auth"),
});

const useHeaderSpy = jest.spyOn(useHeader, "useHeader");
() => ({
  ...jest.requireActual("modules/heade/hooks/use-header"),
});

describe("Auth Btns", () => {
  describe("when renders buttons", () => {
    it("renders correctly", () => {
      const { container } = render(<AuthBtns />);
      expect(container).toMatchSnapshot();
    });

    describe("when user is not authenticated", () => {
      beforeEach(() => {
        render(<AuthBtns />);
      });

      it("renders login button", () => {
        expect(screen.getByTestId("login-btn")).toBeInTheDocument();
      });

      describe("user clicks on login button", () => {
        beforeEach(() => {
          fireEvent.click(screen.getByTestId("login-btn"));
        });

        it("renders close login button", () => {
          expect(screen.getByTestId("close-login-btn")).toBeInTheDocument();
        });
      });
    });

    describe("when user is authenticated", () => {
      beforeEach(() => {
        useAuthSpy.mockImplementation(() => ({
          ...jest.requireActual("modules/auth/hooks/use-auth"),
          isAuthenticated: true,
          user,
        }));

        useHeaderSpy.mockImplementation(() => ({
          ...jest.requireActual("modules/header/hooks/use-header"),
          authFormIsOpened: false,
        }));

        render(<AuthBtns />);
      });

      it("renders logout button and user name", () => {
        const logoutButton = screen.getByTestId("logout-btn");
        const username = screen.getByText(user.username);

        expect(logoutButton).toBeInTheDocument();
        expect(username).toBeInTheDocument();
      });
    });
  });
});
