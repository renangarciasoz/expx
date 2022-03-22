import { v4 } from "uuid";

export type SignInRequestData = {
  email: string;
  password: string;
};

const delay = (amount = 100) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function signInRequest(data: SignInRequestData) {
  await delay();

  return {
    token: v4(),
    id: 5301,
    username: "test user",
    name: "Test User",
    email: "user@expx.fi",
    avatar_url: "https://github.com/renangarciasoz.png",
    contracts: [
      {
        id: "0o301",
        symbol: "eth_lido",
        holding: 325.1,
      },
    ],
  };
}

export async function recoverUserInformation() {
  await delay();

  return {
    token: v4(),
    id: 5301,
    username: "test user",
    name: "Test User",
    email: "user@expx.fi",
    avatar_url: "https://github.com/renangarciasoz.png",
    contracts: [
      {
        id: "0o301",
        symbol: "eth_lido",
        holding: 325.1,
      },
    ],
  };
}
