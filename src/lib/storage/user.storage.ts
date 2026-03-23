import { getStorage } from "./storage.mmkv";
import { STORAGE_KEYS } from "./storage.keys";
import { deserializeUserData, serializeUserData } from "./storage.utils";
import { initializeContactsStorage } from "./contacts.storage";
import { UserData } from "../../types/user.types";

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
    linkOneUrl: user.linkOneUrl || "",
    linkTwoUrl: user.linkTwoUrl || "",
    linkThreeUrl: user.linkThreeUrl || "",
    linkFourUrl: user.linkFourUrl || "",
    linkFiveUrl: user.linkFiveUrl || "",
    linkOneTitle: user.linkOneTitle || "",
    linkTwoTitle: user.linkTwoTitle || "",
    linkThreeTitle: user.linkThreeTitle || "",
    linkFourTitle: user.linkFourTitle || "",
    linkFiveTitle: user.linkFiveTitle || "",
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
    linkOneUrl: user.linkOneUrl || "",
    linkTwoUrl: user.linkTwoUrl || "",
    linkThreeUrl: user.linkThreeUrl || "",
    linkFourUrl: user.linkFourUrl || "",
    linkFiveUrl: user.linkFiveUrl || "",
    linkOneTitle: user.linkOneTitle || "",
    linkTwoTitle: user.linkTwoTitle || "",
    linkThreeTitle: user.linkThreeTitle || "",
    linkFourTitle: user.linkFourTitle || "",
    linkFiveTitle: user.linkFiveTitle || "",
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
