import * as SecureStore from "expo-secure-store";

export async function getEncryptionKey(): Promise<string> {
  let key = await SecureStore.getItemAsync("mmkv_encryption_key");

  if (!key) {
    key = Math.random().toString(36).slice(2) + Date.now().toString(36);
    await SecureStore.setItemAsync("mmkv_encryption_key", key);
  }

  return key;
}
