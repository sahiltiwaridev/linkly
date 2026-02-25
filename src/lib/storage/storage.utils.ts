export type StoredUser = {
  name: string;
  gender: "male" | "female" | "neutral";
  profession: string;
  email: string;
  bio: string;
};

export type StoredContact = StoredUser & {
  id: string;
};

const normalizeText = (value: string = ""): string => {
  return value.trim().replace(/\s+/g, " ");
};

const sanitizeUserFields = (user: StoredUser): StoredUser => {
  return {
    name: normalizeText(user.name),
    gender: user.gender,
    profession: normalizeText(user.profession),
    email: normalizeText(user.email).toLowerCase(),
    bio: normalizeText(user.bio),
  };
};

export const serializeUserData = (param: StoredUser): string => {
  const sanitized = sanitizeUserFields(param);
  return JSON.stringify(sanitized);
};

export const deserializeUserData = (param: string): StoredUser => {
  return JSON.parse(param);
};

export const serializeContactsData = (param: StoredContact[]): string => {
  const sanitizedContacts = param.map((contact) => ({
    ...sanitizeUserFields(contact),
    id: contact.id,
  }));

  return JSON.stringify(sanitizedContacts);
};

export const deserializeContactsData = (param: string): StoredContact[] => {
  return JSON.parse(param);
};
