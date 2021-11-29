import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIAccount(ctx?: any) {

  const { '@muwebtools.token': token } = parseCookies(ctx);

  const apiAccount = axios.create({
    baseURL: 'http://localhost:4000',
  })

  if (token) {
    apiAccount.defaults.headers.common['authorization'] = token;
  }

  apiAccount.interceptors.request.use(config => {
    return config;
  })

  return apiAccount;
}

export function getAPICharacter(ctx?: any) {
  const { '@muwebtools.token': token } = parseCookies(ctx);

  const apiCharacter = axios.create({
    baseURL: 'http://localhost:4001',
  })

  if (token) {
    apiCharacter.defaults.headers.common['authorization'] = token;
  }

  apiCharacter.interceptors.request.use(config => {
    return config;
  })

  return apiCharacter;
}