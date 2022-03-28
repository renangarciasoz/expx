/**
 * @jest-environment jsdom
 */

import login from "@fixtures/login.json";
import user from "@fixtures/user.json";
import { act, renderHook } from "@testing-library/react-hooks";
import { api } from "api/api-client";
import { TOKEN_NAME } from "constants/auth.constants";
import { DASHBOARD } from "constants/urls.constants";
import { useStore } from "store/auth.store";
import { v4 } from "uuid";
import { useAuth } from "../use-auth";

const pushRouter = jest.fn();
jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: () => ({
    push: pushRouter,
  }),
}));

Object.defineProperty(document, "cookie", {
  writable: true,
  value: `${TOKEN_NAME}=${v4()}`,
});

describe("useAuth hook", () => {
  const { result: resultAuthStory } = renderHook(() => useStore());
  const { result } = renderHook(() => useAuth());

  describe("sign in", () => {
    it("does sign in user with valid credentias", async () => {
      await act(async () => {
        await result.current.signIn({
          email: login.username,
          password: login.password,
        });
      });

      expect(resultAuthStory.current.error).toBe(null);
      expect(result.current.user).toEqual(user);
      expect(result.current.isAuthenticated).toBe(true);
      expect(api.defaults.headers.common["Authorization"]).toBeTruthy();
      expect(pushRouter).toHaveBeenCalledWith(DASHBOARD);
    });

    it("does not sign in user with invalid credentias", async () => {
      await act(async () => {
        await result.current.signIn({
          email: "wrong@wrong.com",
          password: "wrong@wrong.com",
        });
      });

      expect(resultAuthStory.current.error).toBe("invalidCredentials");
      expect(result.current.user).toBe(null);
      expect(result.current.isAuthenticated).toBe(false);
      expect(api.defaults.headers.common["Authorization"]).toBeFalsy();
    });
  });

  describe("sign out", () => {
    it("does sign out user", async () => {
      await act(async () => {
        await result.current.signOut();
      });

      expect(resultAuthStory.current.user).toBe(null);
      expect(result.current.user).toBe(null);
      expect(result.current.isAuthenticated).toBe(false);
      expect(api.defaults.headers.common["Authorization"]).toBeFalsy();
    });
  });
});
