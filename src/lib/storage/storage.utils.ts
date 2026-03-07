import { Contact, UserData } from "../../types/user.types";

export type StoredUser = UserData;
export type StoredContact = Contact;

const normalizeText = (value: string = ""): string => {
  return value.trim().replace(/\s+/g, " ");
};

const sanitizeUserFields = (user: StoredUser): StoredUser => {
  return {
    name: normalizeText(user.name),
    gender: user.gender,
    email: normalizeText(user.email).toLowerCase(),
    phone: normalizeText(user.phone),
    whatsapp: normalizeText(user.whatsapp),
    profession: normalizeText(user.profession),
    bio: normalizeText(user.bio),

    userLinkFirst: normalizeText(user.userLinkFirst),
    userLinkSecond: normalizeText(user.userLinkSecond),
    userLinkThird: normalizeText(user.userLinkThird),
    userLinkFourth: normalizeText(user.userLinkFourth),
    userLinkFifth: normalizeText(user.userLinkFifth),

    userLinkTitleFirst: normalizeText(user.userLinkTitleFirst),
    userLinkTitleSecond: normalizeText(user.userLinkTitleSecond),
    userLinkTitleThird: normalizeText(user.userLinkTitleThird),
    userLinkTitleFourth: normalizeText(user.userLinkTitleFourth),
    userLinkTitleFifth: normalizeText(user.userLinkTitleFifth),
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
