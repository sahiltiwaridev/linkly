import {
  deserializeUserData,
  serializeUserData,
} from "../storage/storage.utils";
import { getUser } from "../storage/user.storage";

export const generateUserQRPayload = (): string | null => {
  const user = getUser();
  return user ? serializeUserData(user) : null;
};

export const decodeUserQRPayload = (payload: string | null) => {
  if (!payload) return null;
  return deserializeUserData(payload);
};
