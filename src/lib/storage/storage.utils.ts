import { Contact, UserData } from "../../types/user.types";

export type StoredUser = UserData;
export type StoredContact = Contact;

const normalizeText = (value: string = ""): string => {
  return value.trim().replace(/\s+/g, " ");
};

const emptyUserData = (): StoredUser => ({
  name: "",
  gender: "neutral",
  email: "",
  phone: "",
  whatsapp: "",
  profession: "",
  bio: "",
  linkOneUrl: "",
  linkTwoUrl: "",
  linkThreeUrl: "",
  linkFourUrl: "",
  linkFiveUrl: "",
  linkOneTitle: "",
  linkTwoTitle: "",
  linkThreeTitle: "",
  linkFourTitle: "",
  linkFiveTitle: "",
});

const sanitizeUserFields = (user: Partial<StoredUser> | null | undefined): StoredUser => {
  const base = emptyUserData();
  if (!user || typeof user !== "object") return base;

  return {
    name: normalizeText(typeof user.name === "string" ? user.name : base.name),
    gender: user.gender ?? base.gender,
    email: normalizeText(typeof user.email === "string" ? user.email : base.email).toLowerCase(),
    phone: normalizeText(typeof user.phone === "string" ? user.phone : base.phone),
    whatsapp: normalizeText(typeof user.whatsapp === "string" ? user.whatsapp : base.whatsapp),
    profession: normalizeText(typeof user.profession === "string" ? user.profession : base.profession),
    bio: normalizeText(typeof user.bio === "string" ? user.bio : base.bio),
    linkOneUrl: normalizeText(typeof user.linkOneUrl === "string" ? user.linkOneUrl : base.linkOneUrl),
    linkTwoUrl: normalizeText(typeof user.linkTwoUrl === "string" ? user.linkTwoUrl : base.linkTwoUrl),
    linkThreeUrl: normalizeText(typeof user.linkThreeUrl === "string" ? user.linkThreeUrl : base.linkThreeUrl),
    linkFourUrl: normalizeText(typeof user.linkFourUrl === "string" ? user.linkFourUrl : base.linkFourUrl),
    linkFiveUrl: normalizeText(typeof user.linkFiveUrl === "string" ? user.linkFiveUrl : base.linkFiveUrl),
    linkOneTitle: normalizeText(typeof user.linkOneTitle === "string" ? user.linkOneTitle : base.linkOneTitle),
    linkTwoTitle: normalizeText(typeof user.linkTwoTitle === "string" ? user.linkTwoTitle : base.linkTwoTitle),
    linkThreeTitle: normalizeText(typeof user.linkThreeTitle === "string" ? user.linkThreeTitle : base.linkThreeTitle),
    linkFourTitle: normalizeText(typeof user.linkFourTitle === "string" ? user.linkFourTitle : base.linkFourTitle),
    linkFiveTitle: normalizeText(typeof user.linkFiveTitle === "string" ? user.linkFiveTitle : base.linkFiveTitle),
  };
};

export const serializeUserData = (param: StoredUser): string => {
  const sanitized = sanitizeUserFields(param);
  return JSON.stringify(sanitized);
};

export const deserializeUserData = (param: string): StoredUser => {
  try {
    const parsed = JSON.parse(param);
    return sanitizeUserFields(parsed);
  } catch {
    return emptyUserData();
  }
};

export const serializeContactsData = (param: StoredContact[]): string => {
  const sanitizedContacts = param.map((contact) => ({
    ...sanitizeUserFields(contact),
    id: contact.id,
  }));

  return JSON.stringify(sanitizedContacts);
};

export const deserializeContactsData = (param: string): StoredContact[] => {
  try {
    const parsed = JSON.parse(param);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is StoredContact => Boolean(item && typeof item === "object"));
  } catch {
    return [];
  }
};
