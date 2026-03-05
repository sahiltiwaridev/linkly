import {
  deserializeUserData,
  serializeUserData,
} from "../storage/storage.utils";
import { getUser } from "../storage/user.storage";
import { encryptQR, decryptQR } from "./qr.crypto";

const QR_PREFIX = "LINKLY_V1:";

export const generateUserQRPayload = (): string | null => {
  const user = getUser();
  if (!user) return null;
  const serialized = serializeUserData(user);
  const encrypted = encryptQR(serialized);
  return `${QR_PREFIX}${encrypted}`;
};

export const decodeUserQRPayload = (payload: string | null) => {
  if (!payload) return null;
  if (!payload.startsWith(QR_PREFIX)) return null;
  const encrypted = payload.replace(QR_PREFIX, "");
  const decrypted = decryptQR(encrypted);
  if (!decrypted) return null;

  try {
    const parsed = deserializeUserData(decrypted);
    if (!parsed?.name) return null;
    return parsed;
  } catch {
    return null;
  }
};
