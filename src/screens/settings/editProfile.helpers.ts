import {
  userEmailValidator,
  userNameValidator,
} from "../../lib/validation/user.validators";
import { UserData } from "../../lib/storage/user.storage";

export type EditProfileDraft = {
  name: string;
  gender: UserData["gender"];
  profession: string;
  bio: string;
  phone: string;
  whatsapp: string;
  email: string;
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

export const EMPTY_DRAFT: EditProfileDraft = {
  name: "",
  gender: "neutral",
  profession: "",
  bio: "",
  phone: "",
  whatsapp: "",
  email: "",
  userLinkFirst: "",
  userLinkSecond: "",
  userLinkThird: "",
  userLinkFourth: "",
  userLinkFifth: "",
  userLinkTitleFirst: "",
  userLinkTitleSecond: "",
  userLinkTitleThird: "",
  userLinkTitleFourth: "",
  userLinkTitleFifth: "",
};

export const phoneValidator = (value: string): string | null => {
  if (!value) return null;
  if (value.length !== 10) return "Must be exactly 10 digits.";
  return null;
};

const hasLinkPairError = (title: string, url: string) => {
  const trimmedTitle = title.trim();
  const trimmedUrl = url.trim();
  return Boolean((trimmedUrl && !trimmedTitle) || (trimmedTitle && !trimmedUrl));
};

export const validateDraft = (draft: EditProfileDraft) => {
  const nameError = userNameValidator(draft.name);
  const phoneError = phoneValidator(draft.phone);
  const whatsappError = phoneValidator(draft.whatsapp);
  const emailError = userEmailValidator(draft.email);
  const linkError =
    hasLinkPairError(draft.userLinkTitleFirst, draft.userLinkFirst) ||
    hasLinkPairError(draft.userLinkTitleSecond, draft.userLinkSecond) ||
    hasLinkPairError(draft.userLinkTitleThird, draft.userLinkThird) ||
    hasLinkPairError(draft.userLinkTitleFourth, draft.userLinkFourth) ||
    hasLinkPairError(draft.userLinkTitleFifth, draft.userLinkFifth);

  return { nameError, phoneError, whatsappError, emailError, linkError };
};

export const getShortNameError = (nameError: string | null) => {
  if (!nameError) return null;
  if (nameError === "Name is required") return "Required";
  if (nameError === "Name must be at least 3 characters") return "Too short";
  return "Invalid name";
};

export const createDraftFromUser = (user: UserData): EditProfileDraft => ({
  name: user.name,
  gender: user.gender,
  profession: user.profession,
  bio: user.bio,
  phone: user.phone,
  whatsapp: user.whatsapp,
  email: user.email,
  userLinkFirst: user.userLinkFirst,
  userLinkSecond: user.userLinkSecond,
  userLinkThird: user.userLinkThird,
  userLinkFourth: user.userLinkFourth,
  userLinkFifth: user.userLinkFifth,
  userLinkTitleFirst: user.userLinkTitleFirst,
  userLinkTitleSecond: user.userLinkTitleSecond,
  userLinkTitleThird: user.userLinkTitleThird,
  userLinkTitleFourth: user.userLinkTitleFourth,
  userLinkTitleFifth: user.userLinkTitleFifth,
});

export const hasDraftChanges = (draft: EditProfileDraft, user: UserData | null) => {
  if (!user) return false;
  const current = createDraftFromUser(user);
  const keys = Object.keys(current) as Array<keyof EditProfileDraft>;
  return keys.some((key) => draft[key] !== current[key]);
};

export const buildUpdatedUser = (current: UserData, draft: EditProfileDraft): UserData => ({
  ...current,
  ...draft,
});
