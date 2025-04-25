export class StorageService {
  constructor(storage) {
    this.storage = window[`${storage}Storage`];
  }

  set(key, value) {
    try {
      if (JSON.stringify(value)) {
        this.storage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      if (__DEV__) {
        console.log("Failed to Store Data to async storage", key, e);
      }
    }
  }

  get(key) {
    try {
      if (this.storage.getItem(key)) {
        return JSON.parse(this.storage(key) ?? "");
      }
    } catch (e) {
      if (__DEV__) {
        console.log("Failed to GET Data to async storage", key, e);
      }
    }
  }

  remove(key) {
    try {
      this.storage.removeItem(key);
    } catch (e) {
      if (__DEV__) {
        console.log("Failed to Remove Data to async storage", key, e);
      }
    }
  }
  clear() {
    this.storage.clear();
  }
}
