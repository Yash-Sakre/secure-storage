import {
  storeItemIndexedDB,
  getItemIndexedDB,
  removeItemIndexedDB,
  clearAllDataIndexedDB,
} from "./indexedDB";

import {
  storeItemSession,
  getItemSession,
  removeItemSession,
  clearAllDataSession,
} from "./session-storage";

import {
  storeItemLocal,
  getItemLocal,
  removeItemLocal,
  clearAllDataLocal,
} from "./local-storage";

export {
  // localStorage
  storeItemLocal,
  getItemLocal,
  removeItemLocal,
  clearAllDataLocal,

  // sessionStorage
  storeItemSession,
  getItemSession,
  removeItemSession,
  clearAllDataSession,

  // IndexedDB
  storeItemIndexedDB,
  getItemIndexedDB,
  removeItemIndexedDB,
  clearAllDataIndexedDB,
};
