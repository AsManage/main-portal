import { STORAGE_KEY } from "constants/common";

export class LocalStorage {
  availableKey = STORAGE_KEY;

  setStorageItem(key: STORAGE_KEY, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data));

      return true;
    } catch {
      return false;
    }
  }

  getStorageItem(key: STORAGE_KEY) {
    try {
      const data = localStorage.getItem(key);
      if (data) return JSON.parse(data);
      else return null;
    } catch {
      return null;
    }
  }

  clearStorageItem(key: STORAGE_KEY) {
    try {
      localStorage.removeItem(key);

      return true;
    } catch {
      return false;
    }
  }

  clearAllStorage() {
    try {
      localStorage.clear();

      return true;
    } catch {
      return false;
    }
  }
}
