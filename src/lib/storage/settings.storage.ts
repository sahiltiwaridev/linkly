import { getStorage } from "./storage.mmkv";
import { STORAGE_KEYS } from "./storage.keys";

export const isBiometricLockEnabled = (): boolean =>
  getStorage().getBoolean(STORAGE_KEYS.BIOMETRIC_LOCK) ?? false;

export const setBiometricLock = (enabled: boolean) =>
  getStorage().set(STORAGE_KEYS.BIOMETRIC_LOCK, enabled);