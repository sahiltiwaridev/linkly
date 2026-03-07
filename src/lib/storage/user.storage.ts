import { getStorage } from "./storage.mmkv";
import { STORAGE_KEYS } from "./storage.keys";
import { deserializeUserData, serializeUserData } from "./storage.utils";
import { initializeContactsStorage } from "./contacts.storage";
import { Contact, UserData } from "../../types/user.types";

export type { UserData, Contact } from "../../types/user.types";

export const createUser = (user: UserData) => {
  const storage = getStorage();

  const userString = serializeUserData({
    name: user.name,
    gender: user.gender,
    email: user.email || "",
    phone: user.phone || "",
    whatsapp: user.whatsapp || "",
    profession: user.profession || "",
    bio: user.bio || "",
    userLinkFirst: user.userLinkFirst || "",
    userLinkSecond: user.userLinkSecond || "",
    userLinkThird: user.userLinkThird || "",
    userLinkFourth: user.userLinkFourth || "",
    userLinkFifth: user.userLinkFifth || "",
    userLinkTitleFirst: user.userLinkTitleFirst || "",
    userLinkTitleSecond: user.userLinkTitleSecond || "",
    userLinkTitleThird: user.userLinkTitleThird || "",
    userLinkTitleFourth: user.userLinkTitleFourth || "",
    userLinkTitleFifth: user.userLinkTitleFifth || "",
  });

  storage.set(STORAGE_KEYS.USER_PROFILE, userString);
  initializeContactsStorage();
};

export const updateUser = (user: UserData) => {
  const storage = getStorage();

  const userString = serializeUserData({
    name: user.name,
    gender: user.gender,
    email: user.email || "",
    phone: user.phone || "",
    whatsapp: user.whatsapp || "",
    profession: user.profession || "",
    bio: user.bio || "",
    userLinkFirst: user.userLinkFirst || "",
    userLinkSecond: user.userLinkSecond || "",
    userLinkThird: user.userLinkThird || "",
    userLinkFourth: user.userLinkFourth || "",
    userLinkFifth: user.userLinkFifth || "",
    userLinkTitleFirst: user.userLinkTitleFirst || "",
    userLinkTitleSecond: user.userLinkTitleSecond || "",
    userLinkTitleThird: user.userLinkTitleThird || "",
    userLinkTitleFourth: user.userLinkTitleFourth || "",
    userLinkTitleFifth: user.userLinkTitleFifth || "",
  });

  storage.set(STORAGE_KEYS.USER_PROFILE, userString);
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
