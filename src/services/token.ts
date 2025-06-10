import {Token} from '../types/token.ts';

const AUTH_TOKEN_KEY_NAME = 'auth-token';

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const setToken = (token: Token): void =>
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);

export const removeToken = (): void =>
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
