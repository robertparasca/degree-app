import config from './config';

export const saveToken = (token) => localStorage.setItem(config.localStorageKeys.token, token);

export const removeToken = () => localStorage.removeItem(config.localStorageKeys.token);

export const hasToken = () => !!localStorage.getItem(config.localStorageKeys.token);

export const getToken = () => localStorage.getItem(config.localStorageKeys.token);
