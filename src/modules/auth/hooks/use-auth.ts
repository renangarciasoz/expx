import { api } from "api/api-client";
import {
  recoverUserInformation,
  signInRequest,
  SignInRequestData,
} from "api/auth.api";
import { AxiosError } from "axios";
import { EXPIRATION_IN_HOURS, TOKEN_NAME } from "constants/auth.constants";
import { DASHBOARD, HOME } from "constants/urls.constants";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useEffect } from "react";
import { useStore } from "store/auth.store";

export function useAuth() {
  const router = useRouter();
  const { user, error, setUser, setError, removeUser, ...store } = useStore();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { [TOKEN_NAME]: token } = parseCookies();

    if (token) {
      recoverUserInformation().then((user) => {
        setUser(user);
      });
    }
  }, [setUser]);

  async function signIn({ email, password }: SignInRequestData) {
    setError("");

    try {
      const { token, ...user } = await signInRequest({
        email,
        password,
      });

      setCookie(undefined, TOKEN_NAME, token, {
        maxAge: 60 * 60 * EXPIRATION_IN_HOURS, // seconds * minutes * constant number in hours
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user);

      router.push(DASHBOARD);
    } catch (e) {
      removeUser();
      delete api.defaults.headers.common["Authorization"];
      setError((e as AxiosError).message);
    }
  }

  async function signOut() {
    destroyCookie(undefined, TOKEN_NAME);
    delete api.defaults.headers.common["Authorization"];
    removeUser();
    router.push(HOME);
  }

  return {
    ...store,
    isAuthenticated,
    user,
    error,
    signIn,
    setError,
    signOut,
  };
}
