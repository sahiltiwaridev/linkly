import { USER_KEY } from "../../config/storageKeys";
import storage from "./mmkv";
import { deserializeUserData, serializeUserData } from "./storage.utils";

type UserData = {
  name: string;
  gender: "male" | "female" | "neutral";
  profession: string;
  email: string;
  bio: string;
};
type StoredUser = {
  name: string;
  gender: "male" | "female" | "neutral";
  profession: string;
  email: string;
  bio: string;
};

export const createUser = (user: UserData) => {
  const userData = {
    name: user.name,
    gender: user.gender,
    profession: user.profession || "",
    email: user.email || "",
    bio: user.bio || "",
  };
  const userString = serializeUserData(userData);
  storage.set(USER_KEY, userString);
};

export const getUser = (): StoredUser | null => {
  const storedUser: string | undefined = storage.getString(USER_KEY);
  return storedUser ? deserializeUserData(storedUser) : null;
};
