import { api } from "api/api-client";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import React, { createContext, useEffect, useState } from "react";
import { User } from "src/@types/user";
import {
  recoverUserInformation,
  signInRequest,
  SignInRequestData,
} from "src/api/auth.api";
import { EXPIRATION_IN_HOURS, TOKEN_NAME } from "src/constants/auth.constants";
import { DASHBOARD } from "src/constants/urls.constants";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInRequestData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { [TOKEN_NAME]: token } = parseCookies();

    if (token) {
      recoverUserInformation().then((user) => {
        setUser(user);
      });
    }
  });

  async function signIn({ email, password }: SignInRequestData) {
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
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
