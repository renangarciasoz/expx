import { v4 } from "uuid";

const mockLogin = {
  username: "user@expx.fi",
  password: "Br98PKe*js76QaF@1OdX",
};

const mockUserData = {
  token: v4(),
  id: 5301,
  username: "test user",
  name: "Test User", // improve to API
  email: "user@expx.fi", // improve to API
  contracts: [
    {
      id: "0o301",
      symbol: "eth_lido",
      holding: 325.1,
    },
  ],
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
