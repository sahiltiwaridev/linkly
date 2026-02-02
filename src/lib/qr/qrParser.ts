import {
  deserializeUserData,
  serializeUserData,
} from "../storage/storage.utils";
import { getUser } from "../storage/user.storage";

export const buildUserQRPayload = (): string | null => {
  const user = getUser();
  return user ? serializeUserData(user) : null;
};

export const parseScannedUserQRPayload = (payload: string | null) => {
  if (!payload) return null;
  return deserializeUserData(payload);
};
