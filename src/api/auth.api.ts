import mockLogin from "@fixtures/login.json";
import userData from "@fixtures/user.json";
import { v4 } from "uuid";

const mockUserData = {
  token: v4(),
  ...userData,
};

export type SignInRequestData = {
  email: string;
  password: string;
};

export async function signInRequest({ email, password }: SignInRequestData) {
  if (email === mockLogin.username && password === mockLogin.password) {
    return mockUserData;
  }

  throw new Error("");
}

export async function recoverUserInformation() {
  return mockUserData;
}
