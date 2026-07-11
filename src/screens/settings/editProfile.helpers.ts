import {
  userEmailValidator,
  userNameValidator,
} from "../../lib/validation/user.validators";
import { UserData } from "../../types/user.types";

export type EditProfileDraft = {
  name: string;
  gender: UserData["gender"];
  profession: string;
  bio: string;
  phone: string;
  whatsapp: string;
  email: string;
  linkOneUrl: string;
  linkOneTitle: string;
  linkTwoUrl: string;
  linkTwoTitle: string;
  linkThreeUrl: string;
  linkThreeTitle: string;
  linkFourUrl: string;
  linkFourTitle: string;
  linkFiveUrl: string;
  linkFiveTitle: string;
};

export const EMPTY_DRAFT: EditProfileDraft = {
  name: "",
  gender: "neutral",
  profession: "",
  bio: "",
  phone: "",
  whatsapp: "",
  email: "",
  linkOneUrl: "",
  linkOneTitle: "",
  linkTwoUrl: "",
  linkTwoTitle: "",
  linkThreeUrl: "",
  linkThreeTitle: "",
  linkFourUrl: "",
  linkFourTitle: "",
  linkFiveUrl: "",
  linkFiveTitle: "",
};

export const phoneValidator = (value: string): string | null => {
  if (!value) return null;
  if (value.length !== 10) return "Must be exactly 10 digits.";
  return null;
};

const isValidLinkUrl = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) return true;

  if (/^(mailto|tel|sms):/i.test(trimmed)) return true;

  if (trimmed.includes("@") && !trimmed.includes("://")) return false;

  if (/^[\d+().\s-]+$/.test(trimmed)) return false;

  try {
    const url = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
    return Boolean(url.hostname);
  } catch {
    return false;
  }
};

const hasLinkPairError = (title: string, url: string) => {
  const trimmedTitle = title.trim();
  const trimmedUrl = url.trim();

  if (trimmedUrl && !trimmedTitle) return true;
  if (trimmedTitle && !trimmedUrl) return true;
  if (trimmedTitle && trimmedUrl && !isValidLinkUrl(trimmedUrl)) return true;

  return false;
};

export const validateDraft = (draft: EditProfileDraft) => {
  const nameError = userNameValidator(draft.name);
  const phoneError = phoneValidator(draft.phone);
  const whatsappError = phoneValidator(draft.whatsapp);
  const emailError = userEmailValidator(draft.email);
  const linkError =
    hasLinkPairError(draft.linkOneTitle, draft.linkOneUrl) ||
    hasLinkPairError(draft.linkTwoTitle, draft.linkTwoUrl) ||
    hasLinkPairError(draft.linkThreeTitle, draft.linkThreeUrl) ||
    hasLinkPairError(draft.linkFourTitle, draft.linkFourUrl) ||
    hasLinkPairError(draft.linkFiveTitle, draft.linkFiveUrl);

  return { nameError, phoneError, whatsappError, emailError, linkError };
};

export const getShortNameError = (nameError: string | null) => {
  if (!nameError) return null;
  if (nameError === "Name is required") return "Required";
  if (nameError === "Name must be at least 3 characters") return "Too short";
  return "Invalid name";
};

export const createDraftFromUser = (user: UserData): EditProfileDraft => {
  if (!user) return EMPTY_DRAFT;

  return {
    name: user.name || "",
    gender: user.gender || "neutral",
    profession: user.profession || "",
    bio: user.bio || "",
    phone: user.phone || "",
    whatsapp: user.whatsapp || "",
    email: user.email || "",
    linkOneUrl: user.linkOneUrl || "",
    linkOneTitle: user.linkOneTitle || "",
    linkTwoUrl: user.linkTwoUrl || "",
    linkTwoTitle: user.linkTwoTitle || "",
    linkThreeUrl: user.linkThreeUrl || "",
    linkThreeTitle: user.linkThreeTitle || "",
    linkFourUrl: user.linkFourUrl || "",
    linkFourTitle: user.linkFourTitle || "",
    linkFiveUrl: user.linkFiveUrl || "",
    linkFiveTitle: user.linkFiveTitle || "",
  };
};

export const hasDraftChanges = (
  draft: EditProfileDraft,
  user: UserData | null,
) => {
  if (!user) return false;
  const current = createDraftFromUser(user);
  const keys = Object.keys(current) as Array<keyof EditProfileDraft>;
  return keys.some((key) => draft[key] !== current[key]);
};

export const buildUpdatedUser = (
  current: UserData,
  draft: EditProfileDraft,
): UserData => ({
  ...current,
  ...draft,
});