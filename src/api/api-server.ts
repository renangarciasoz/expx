import axios from "axios";
import { TOKEN_NAME } from "constants/auth.constants";
import { parseCookies } from "nookies";

export const getAPIClient = (ctx?: any) => {
  const { [TOKEN_NAME]: token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333", // only mock
  });

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return api;
};
