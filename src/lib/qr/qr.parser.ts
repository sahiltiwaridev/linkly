import {
  deserializeUserData,
  serializeUserData,
} from "../storage/storage.utils";
import { getUser } from "../storage/user.storage";
import { UserData } from "../../types/user.types";
import { encryptQR, decryptQR } from "./qr.crypto";

const QR_PREFIX = "LINKLY_V1:";

// qr.parser.ts
export const generateUserQRPayload = (): string | null => {
  const user = getUser();
  if (!user) return null;
  const serialized = serializeUserData(user);
  return `${QR_PREFIX}${serialized}`;
};

export const decodeUserQRPayload = (payload: string | null): UserData | null => {
  if (!payload) return null;
  const normalizedPayload = payload.trim();
  const data = normalizedPayload.startsWith(QR_PREFIX)
    ? normalizedPayload.slice(QR_PREFIX.length)
    : normalizedPayload;
  try {
    const parsed = deserializeUserData(data);
    if (!parsed?.name) return null;
    return parsed;
  } catch {
    return null;
  }
};
