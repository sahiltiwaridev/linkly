import * as SecureStore from "expo-secure-store";
import * as Crypto from "expo-crypto";

export async function getEncryptionKey(): Promise<string> {
  let key = await SecureStore.getItemAsync("mmkv_encryption_key");

  if (!key) {
    const bytes = await Crypto.getRandomBytesAsync(32);
    key = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    await SecureStore.setItemAsync("mmkv_encryption_key", key);
  }

  return key;
}