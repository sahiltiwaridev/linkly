import storage from "./mmkv";

type UserData = {
  name: string;
  gender: "male" | "female" | "neutral";
  profession: string;
  email: string;
  bio: string;
};

export const createUser = (user: UserData) => {
  storage.set("user.name", user.name);
  storage.set("user.gender", user.gender);
  storage.set("user.profession", user.profession || "");
  storage.set("user.email", user.email || "");
  storage.set("user.bio", user.bio || "");
};

export const getUser = () => {
  return storage.getString("user.name");
};
