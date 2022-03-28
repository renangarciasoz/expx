/**
 * @jest-environment jsdom
 */

import login from "@fixtures/login.json";
import * as useHeader from "modules/header/hooks/use-header";
import { act, cleanup, fireEvent, render, screen } from "utils/test-utils";
import { AuthForm } from "../auth-form.component";

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Auth Form", () => {
  describe("when renders form", () => {
    it("renders correctly", () => {
      const { container } = render(<AuthForm />);
      expect(container).toMatchSnapshot();
    });

    describe("when header is at bottom position", () => {
      beforeAll(() => {
        jest.spyOn(useHeader, "useHeader").mockImplementation(() => ({
          ...jest.requireActual("modules/header/hooks/use-header"),
          headerIsAtTopPosition: false,
        }));
      });

      it("auth wrapper should have 80px top margin", () => {
        const { getByTestId } = render(<AuthForm />);
        const formWrapperStyles = getComputedStyle(getByTestId("auth-wrapper"));

        expect(formWrapperStyles.marginTop).toBe("80px");
      });
    });

    describe("when user does fill the form and submit", () => {
      describe("with wrong credentials", () => {
        beforeEach(async () => {
          const { getByTestId } = render(<AuthForm />);
          const emailInput = getByTestId("email-input");
          const passwordInput = getByTestId("password-input");
          const loginForm = getByTestId("auth-form");

          await act(async () => {
            await fireEvent.change(emailInput, {
              target: { value: "wrong@wrong.com" },
            });
            await fireEvent.change(passwordInput, {
              target: { value: "wrongpassword" },
            });
            await fireEvent.submit(loginForm);
          });
        });

        afterEach(cleanup);

        it("renders error message", () => {
          expect(screen.getByTestId("login-error-msg")).toBeInTheDocument();
        });
      });

      describe("with wrong credentials", () => {
        beforeEach(async () => {
          jest.spyOn(useHeader, "useHeader").mockImplementation(() => ({
            ...jest.requireActual("modules/header/hooks/use-header"),
            closeAuthForm: jest.fn(),
          }));

          const { getByTestId } = render(<AuthForm />);
          const emailInput = getByTestId("email-input");
          const passwordInput = getByTestId("password-input");
          const loginForm = getByTestId("auth-form");

          await act(async () => {
            await fireEvent.change(emailInput, {
              target: { value: login.username },
            });

            await fireEvent.change(passwordInput, {
              target: { value: login.password },
            });

            await fireEvent.submit(loginForm);
          });
        });

        afterEach(cleanup);

        it("not renders error message", () => {
          expect(
            screen.queryByTestId("login-error-msg")
          ).not.toBeInTheDocument();
        });
      });
    });
  });
});
