import { getStorage } from "./storage.mmkv";
import { STORAGE_KEYS } from "./storage.keys";
import { deserializeUserData, serializeUserData } from "./storage.utils";
import { initializeContactsStorage } from "./contacts.storage";

export type UserData = {
  name: string;
  gender: "male" | "female" | "neutral";
  profession: string;
  email: string;
  bio: string;
};

export type Contact = UserData & {
  id: string;
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
  initializeContactsStorage();
};

export const getUser = (): UserData | null => {
  const storage = getStorage();
  const storedUser = storage.getString(STORAGE_KEYS.USER_PROFILE);

  return storedUser ? deserializeUserData(storedUser) : null;
};

export const removeUser = () => {
  const storage = getStorage();
  storage.clearAll();
};
