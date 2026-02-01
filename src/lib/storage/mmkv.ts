import { createMMKV, MMKV } from "react-native-mmkv";
import { getEncryptionKey } from "./secureKey";

let storage: MMKV | null = null;

export async function initStorage() {
  const encryptionKey = await getEncryptionKey();

  storage = createMMKV({
    id: "secure-storage",
    encryptionKey,
  });
}

export function getStorage(): MMKV {
  if (!storage) {
    throw new Error("MMKV not initialized. Call initStorage() first.");
  }
  return storage;
}
