import { createMMKV } from "react-native-mmkv";
import { getEncryptionKey } from "./secure.key";

let _storage: ReturnType<typeof createMMKV> | null = null;

export const initStorage = async () => {
  const key = await getEncryptionKey();
  _storage = createMMKV({
    id: "secure-storage",
    encryptionKey: key,
  });
};

export function getStorage() {
  if (!_storage) {
    throw new Error("MMKV not initialized. Call initStorage() first.");
  }
  return _storage;
}
