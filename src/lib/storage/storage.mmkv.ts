import { createMMKV } from "react-native-mmkv";
import { getEncryptionKey } from "./secure.key";

let _storage: ReturnType<typeof createMMKV> | null = null;

export const initStorage = async () => {
  if (_storage) return;

  try {
    const key = await getEncryptionKey();
    _storage = createMMKV({
      id: "secure-storage",
      encryptionKey: key,
    });
  } catch (error) {
    console.warn("Falling back to unsecured MMKV storage:", error);
    _storage = createMMKV({
      id: "secure-storage",
    });
  }
};

export function getStorage() {
  if (!_storage) {
    _storage = createMMKV({
      id: "secure-storage",
    });
  }
  return _storage;
}
