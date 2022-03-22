import axios from "axios";
import { parseCookies } from "nookies";
import { TOKEN_NAME } from "src/constants/auth.constants";

export const getAPIClient = (ctx?: any) => {
  const { [TOKEN_NAME]: token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333",
  });

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return api;
};
