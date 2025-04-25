import { STORAGE_KEY } from "../../constants/storageKey";
import { StorageService } from "../storage/storage.service";

const storage = new StorageService("local");

const OIDCService = {
    redirectKey: STORAGE_KEY.REDIRECT_TO,
    clear() {
        storage.remove(this.redirectKey);
    },
    getRedirctPath() {
        const redirectPath = storage.get(this.redirectKey);
        return redirectPath;
    },
    set(redirectPath) {
        storage.set(this.redirectKey, redirectPath);
    }
}



export default OIDCService;