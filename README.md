# Secure Storage

`secure-storage` is a lightweight utility for securely storing data in the browser's `localStorage`, `sessionStorage`, and `indexedDB` with encryption. It helps ensure that sensitive information is encrypted before storing and properly handled with expiration times.

## Features

- **Secure Storage:** Encrypt and store data in `localStorage`, `sessionStorage`, or `indexedDB`.
- **Expiration Support:** Automatically remove data after a specified expiration time.
- **Simple API:** Easy-to-use methods for storing, retrieving, and removing items.
- **Fallback Handling:** Gracefully handles storage limitations and errors.

## Installation

You can install `secure-storage` via npm:

```bash
npm install secure-storage
```

# Usage

## Import the Module

```bash
import { storeItemLocal, getItemLocal, removeItemLocal, clearAllDataLocal } from 'secure-storage'
```
## Local Storage Example
 ### Storing an Item with Expiration

```bash
const key = "userSession";
const data = "some sensitive data";
const expirationInMinutes = 10; // Optional

storeItemLocal(key, data, expirationInMinutes);
```
### Retrieving an Item

```bash
const storedData = getItemLocal("userSession");
if (storedData) {
  console.log("Retrieved data:", storedData);
} else {
  console.log("Data has expired or does not exist.");
}
```

### Removing an Item

```bash
removeItemLocal("userSession");
```

### Clearing All Data
```
clearAllDataLocal();
```

## Session Storage Example
```
import { storeItemSession, getItemSession, removeItemSession, clearAllDataSession } from 'secure-storage';

// Store session data
storeItemSession("sessionKey", "sessionData", 5); // 5-minute expiration

// Retrieve session data
const sessionData = getItemSession("sessionKey");

// Remove session data
removeItemSession("sessionKey");

// Clear all session data
clearAllDataSession();
```

## IndexedDB Example

```
import { storeItemIndexedDB, getItemIndexedDB, removeItemIndexedDB, clearAllDataIndexedDB } from 'secure-storage';

// Store data in IndexedDB
storeItemIndexedDB("indexedDBKey", "indexedDBData");

// Retrieve data from IndexedDB
getItemIndexedDB("indexedDBKey").then(data => console.log(data));

// Remove data from IndexedDB
removeItemIndexedDB("indexedDBKey");

// Clear all data from IndexedDB
clearAllDataIndexedDB();
```

# API Methods

### Local Storage

- ``` storeItemLocal(key: string, data: string, expirationInMinutes?: number): void ```
Stores encrypted data in localStorage. Optionally accepts an expiration time (in minutes).

- ``` getItemLocal(key: string): string | null ```
Retrieves the decrypted data from localStorage. If the data has expired or does not exist, it returns null.

-  ``` removeItemLocal(key: string): void ```
Removes an item from localStorage.

- ```clearAllDataLocal(): void```
Clears all data from localStorage


### Session Storage

- ```storeItemSession(key: string, data: string, expirationInMinutes?: number): void```
Stores encrypted data in sessionStorage. Optionally accepts an expiration time (in minutes).

- ```getItemSession(key: string): string | null```
Retrieves the decrypted data from sessionStorage. If the data has expired or does not exist, it returns null.

- ```removeItemSession(key: string): void```
Removes an item from sessionStorage.

- ```clearAllDataSession(): void```
Clears all data from sessionStorage.

### IndexedDB

- ```storeItemIndexedDB(key: string, data: string): Promise<void>```
Stores encrypted data in IndexedDB.

- ```getItemIndexedDB(key: string): Promise<string | null>```
Retrieves the decrypted data from IndexedDB. If the data does not exist, it returns null.

- ```removeItemIndexedDB(key: string): Promise<void>```
Removes an item from IndexedDB.

- ```clearAllDataIndexedDB(): Promise<void>```
Clears all data from IndexedDB

# License

This project is licensed under the MIT License - see the LICENSE file for details.
