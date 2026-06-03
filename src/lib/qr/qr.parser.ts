import {
  deserializeUserData,
  serializeUserData,
} from "../storage/storage.utils";
import { getUser } from "../storage/user.storage";
import { UserData } from "../../types/user.types";
import { encryptQR, decryptQR } from "./qr.crypto";

const QR_PREFIX = "LINKLY_V1:";

export const generateUserQRPayload = async (): Promise<string | null> => {
  const user = getUser();
  if (!user) return null;
  const serialized = serializeUserData(user);
  const encrypted = await encryptQR(serialized);
  return `${QR_PREFIX}${encrypted}`;
};

export const decodeUserQRPayload = async (
  payload: string | null
): Promise<UserData | null> => {
  if (!payload) return null;
  const normalizedPayload = payload.trim();
  const data = normalizedPayload.startsWith(QR_PREFIX)
    ? normalizedPayload.slice(QR_PREFIX.length)
    : normalizedPayload;
  try {
    const decrypted = await decryptQR(data);
    if (!decrypted) return null;
    const parsed = deserializeUserData(decrypted);
    if (!parsed?.name) return null;
    return parsed;
  } catch {
    return null;
  }
};