import storage from "./mmkv";

export const createUser = (param: string) => {
  storage.set("user.name", param);
};

export const getUser = () => {
  return storage.getString("user.name");
};
