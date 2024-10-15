import { encryptData, decryptData } from "./crypto";

export const storeItemSession = (
  key: string,
  data: string,
  expirationInMinutes?: number
): void => {
  try {
    const encryptedData = encryptData(data);
    const expirationTime = expirationInMinutes
      ? Date.now() + expirationInMinutes * 60 * 1000
      : null;
    const dataWithExpiration = {
      encryptedData,
      expirationTime,
    };
    sessionStorage.setItem(key, JSON.stringify(dataWithExpiration));
  } catch {
    console.error("Failed to store data");
  }
};

export const getItemSession = (key: string) => {
  try {
    const serializedData = sessionStorage.getItem(key);

    if (serializedData) {
      const { encryptedData, expirationTime } = JSON.parse(serializedData);

      if (expirationTime && Date.now() > expirationTime) {
        removeItemSession(key);
        console.warn("Data has expired and has been removed");
        return null;
      }

      return decryptData(encryptedData);
    }

    return null;
  } catch {
    console.error("Failed to get data");
    return null;
  }
};

export const removeItemSession = (key: string): void => {
  try {
    sessionStorage.removeItem(key);
  } catch {
    console.error("Failed to remove data");
  }
};

export const clearAllDataSession = (): void => {
  try {
    sessionStorage.clear();
  } catch {
    console.error("Failed to clear all data");
  }
};
