export type StoredUser = {
  name: string;
  gender: "male" | "female" | "neutral";
  profession: string;
  email: string;
  bio: string;
};

export const serializeUserData = (param: StoredUser): string => {
  const serializedData = JSON.stringify(param);
  return serializedData;
};

export const deserializeUserData = (param: string): StoredUser => {
  const deserializedData = JSON.parse(param);
  return deserializedData;
};
