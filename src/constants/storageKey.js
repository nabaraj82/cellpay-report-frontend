import { envVariables } from "../../env";

const storagePrefix = "cellpay-reports";

export const STORAGE_KEY = {
  TOKEN: `oidc.user:${envVariables.AUTHORIZATION_URL}:${envVariables.CLIENT}`,
  REDIRECT_TO: `${storagePrefix}.redirecttionURL`,
};
