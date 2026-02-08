import { createMMKV } from "react-native-mmkv";
import { getEncryptionKey } from "./secure.key";

let encryptionKey;

export const initStorage = async () => {
  encryptionKey = await getEncryptionKey();
  return encryptionKey;
};

export const storage = createMMKV({
  id: "secure-storage",
  encryptionKey: encryptionKey,
});

export function getStorage() {
  if (!storage) {
    throw new Error("MMKV not initialized. Call initStorage() first.");
  }
  return storage;
}
