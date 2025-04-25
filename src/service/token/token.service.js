import { STORAGE_KEY } from "../../constants/storageKey";


const TokenService = {
    tokenKey: STORAGE_KEY.TOKEN,
    getAccessToken() {
        const accessToken = JSON.parse(localStorage.getItem(this.tokenKey)).access_token;
         if (!accessToken) {
           return null;
        }
        return accessToken;
    },
}
export default TokenService;
