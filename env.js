export const envVariables = {
  AUTHORIZATION_URL: import.meta.env?.VITE_AUTHORIZATION_URL,
  API_BASE_URL: import.meta.env?.VITE_API_ENDPOINT,
  CLIENT: import.meta.env?.VITE_CLIENT,
  REDIRECT_URL: import.meta.env?.VITE_REDIRECT_URL,
  POST_LOGOUT_REDIRECT_URL: import.meta.env?.VITE_POST_LOGOUT_REDIRECT_URL,
};
