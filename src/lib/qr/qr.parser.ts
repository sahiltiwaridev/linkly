import {
  deserializeUserData,
  serializeUserData,
} from "../storage/storage.utils";
import { getUser } from "../storage/user.storage";
import { UserData } from "../../types/user.types";
import { encryptQR, decryptQR } from "./qr.crypto";

const QR_PREFIX = "LINKLY_V1:";

export interface SelectedFields {
  phone: boolean;
  whatsapp: boolean;
  email: boolean;
  linkOne: boolean;
  linkTwo: boolean;
  linkThree: boolean;
  linkFour: boolean;
  linkFive: boolean;
}

export const generateUserQRPayload = async (
  selectedFields?: SelectedFields,
): Promise<string | null> => {
  const user = getUser();
  if (!user) return null;

  const filtered: UserData = {
    name: user.name,
    profession: user.profession,
    bio: user.bio,
    gender: user.gender,

    phone: selectedFields?.phone ? user.phone : "",
    whatsapp: selectedFields?.whatsapp ? user.whatsapp : "",
    email: selectedFields?.email ? user.email : "",
    linkOneTitle: selectedFields?.linkOne ? user.linkOneTitle : "",
    linkOneUrl: selectedFields?.linkOne ? user.linkOneUrl : "",
    linkTwoTitle: selectedFields?.linkTwo ? user.linkTwoTitle : "",
    linkTwoUrl: selectedFields?.linkTwo ? user.linkTwoUrl : "",
    linkThreeTitle: selectedFields?.linkThree ? user.linkThreeTitle : "",
    linkThreeUrl: selectedFields?.linkThree ? user.linkThreeUrl : "",
    linkFourTitle: selectedFields?.linkFour ? user.linkFourTitle : "",
    linkFourUrl: selectedFields?.linkFour ? user.linkFourUrl : "",
    linkFiveTitle: selectedFields?.linkFive ? user.linkFiveTitle : "",
    linkFiveUrl: selectedFields?.linkFive ? user.linkFiveUrl : "",
  };

  const serialized = serializeUserData(filtered);
  const encrypted = await encryptQR(serialized);
  return `${QR_PREFIX}${encrypted}`;
};

export const decodeUserQRPayload = async (
  payload: string | null,
): Promise<UserData | null> => {
  if (!payload) return null;
  const normalizedPayload = payload.trim();
  if (!normalizedPayload) return null;

  const data = normalizedPayload.startsWith(QR_PREFIX)
    ? normalizedPayload.slice(QR_PREFIX.length)
    : normalizedPayload;

  try {
    const decrypted = await decryptQR(data);
    if (!decrypted) return null;
    const parsed = deserializeUserData(decrypted);
    if (!parsed?.name) return null;
    return parsed;
  } catch {
    return null;
  }
};
