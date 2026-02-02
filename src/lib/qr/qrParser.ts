import { serializeUserData } from "../storage/storage.utils";
import { getUser } from "../storage/user.storage";

export const buildUserQRPayload = (): string | null => {
  const user = getUser();

  if (!user) {
    return null;
  }

  return serializeUserData(user);
};
