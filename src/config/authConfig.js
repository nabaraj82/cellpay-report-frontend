import { WebStorageStateStore } from "oidc-client-ts";

export const authConfig = {
  authority: import.meta.env.VITE_AUTHORIZATION_URL,
  client_id: import.meta.env.VITE_CLIENT,
  redirect_uri: import.meta.env.VITE_REDIRECT_URL,
  response_type: "code",
  scope: "openid",
  post_logout_redirect_uri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URL,
  automaticSilentRenew: true,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  onSigninCallback: (user) => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};
