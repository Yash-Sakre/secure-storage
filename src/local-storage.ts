import { encryptData, decryptData } from "./crypto";

export const storeItemLocal = (
  key: string,
  data: string,
  expirationInMinute?: number
): void => {
  try {
    const encryptedData = encryptData(data);
    const expiration = expirationInMinute
      ? expirationInMinute * 60 * 1000 + Date.now()
      : null;
    const dataWithExpiration = {
      encryptedData,
      expiration,
    };
    localStorage.setItem(key, JSON.stringify(dataWithExpiration));
  } catch {
    return;
  }
};

export const getItemLocal = (key: string):string | null => {
  try {
    const serializedData = localStorage.getItem(key);

    if (serializedData) {
      const { encryptedData, expirationTime } = JSON.parse(serializedData);

      if (expirationTime && Date.now() > expirationTime) {
        localStorage.removeItem(key);
        console.warn("Data has expired and has been removed");
        return null;
      }
      return decryptData(encryptedData);
    }
    return null;
  } catch {

    return null;
  }
};

export const removeItemLocal = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch {
    console.error("Failed to remove data");
  }
};

export const clearAllDataLocal = (): void => {
  try {
    localStorage.clear();
  } catch {
    console.error("Failed to clear all data");
  }
};
