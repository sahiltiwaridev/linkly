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
  phone: string;
  whatsapp: string;

  userLinkFirst: string;
  userLinkSecond: string;
  userLinkThird: string;
  userLinkFourth: string;
  userLinkFifth: string;

  userLinkTitleFirst: string;
  userLinkTitleSecond: string;
  userLinkTitleThird: string;
  userLinkTitleFourth: string;
  userLinkTitleFifth: string;
};
export type Contact = UserData & {
  id: string;
};

export const createUser = (user: UserData) => {
  const storage = getStorage();

  const userString = serializeUserData({
    name: user.name,
    gender: user.gender,
    email: user.email || "",
    phone: user.phone || "" ,
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

export const getUser = (): UserData | null => {
  const storage = getStorage();
  const storedUser = storage.getString(STORAGE_KEYS.USER_PROFILE);

  return storedUser ? deserializeUserData(storedUser) : null;
};

export const removeUser = () => {
  const storage = getStorage();
  storage.clearAll();
};
