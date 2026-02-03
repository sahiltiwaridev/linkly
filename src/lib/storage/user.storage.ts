import { getStorage } from "./mmkv";
import { STORAGE_KEYS } from "./storageKeys";
import { deserializeUserData, serializeUserData } from "./storage.utils";
import { createContactsStorage } from "./contacts.storage";

export type UserData = {
  name: string;
  gender: "male" | "female" | "neutral";
  profession: string;
  email: string;
  bio: string;
};

export const createUser = (user: UserData) => {
  const storage = getStorage();
  const userString = serializeUserData({
    name: user.name,
    gender: user.gender,
    profession: user.profession || "",
    email: user.email || "",
    bio: user.bio || "",
  });

  storage.set(STORAGE_KEYS.USER_PROFILE, userString);
  createContactsStorage();
};

export const getUser = (): UserData | null => {
  const storage = getStorage();
  const storedUser = storage.getString(STORAGE_KEYS.USER_PROFILE);

  return storedUser ? deserializeUserData(storedUser) : null;
};
