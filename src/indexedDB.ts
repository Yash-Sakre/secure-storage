import { encryptData, decryptData } from "./crypto";

const indexedOpen = (
  dbName: string,
  storeName: string
): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = (event) => {
      console.log("Error opening");
      reject(event);
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };
  });
};

export const storeItemIndexedDB = async (
  dbName: string,
  storeName: string,
  data: any,
  expirationInMinutes?: number
): Promise<IDBDatabase> => {
  const db = await indexedOpen(dbName, storeName);
  return await new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const encrypt = encryptData(data);
    const expirationTime = expirationInMinutes
      ? Date.now() + expirationInMinutes * 60 * 1000
      : null;
    const request = store.add({
      ...data,
      encryptedData: encrypt,
      expirationTime,
    });

    request.onerror = (event) => {
      console.log("Error setting item");
      reject(event);
    };

    request.onsuccess = () => {
      console.log("Item set successfully");
      resolve(db);
    };
  });
};

export const getItemIndexedDB = (
  dbName: string,
  storeName: string,
  id: number
): Promise<any | null> => {
  return indexedOpen(dbName, storeName).then((db) => {
    return new Promise<any | null>((resolve, reject) => {
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = (event) => {
        const result = (event.target as IDBRequest).result;
        if (result) {
          if (result.expirationTime && Date.now() > result.expirationTime) {
            removeItemIndexedDB(dbName, storeName, id);
            console.warn("Data has expired and has been removed");
            resolve(null);
          } else {
            const decrypt = decryptData(result.encryptedData);
            resolve(decrypt);
          }
        } else {
          resolve(null);
        }
      };

      request.onerror = (event) => {
        console.log("Error getting item");
        reject(event);
      };
    });
  });
};

export const removeItemIndexedDB = (
  dbName: string,
  storeName: string,
  id: number
): Promise<boolean> => {
  return indexedOpen(dbName, storeName).then((db) => {
    return new Promise<boolean>((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onerror = (event) => {
        console.log("Error removing item");
        reject(event);
      };

      request.onsuccess = () => {
        console.log("Item removed successfully");
        resolve(true);
      };
    });
  });
};

export const clearAllDataIndexedDB = (
  dbName: string,
  storeName: string
): Promise<boolean> => {
  return indexedOpen(dbName, storeName).then((db) => {
    return new Promise<boolean>((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onerror = (event) => {
        console.log("Error clearing all items");
        reject(event);
      };

      request.onsuccess = () => {
        console.log("All items removed successfully");
        resolve(true);
      };
    });
  });
};
