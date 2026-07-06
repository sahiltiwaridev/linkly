import { decodeUserQRPayload } from "../qr/qr.parser";
import { getAllContacts } from "../storage/contacts.storage";
import { getUser } from "../storage/user.storage";
import {
  PreviewProfileResult,
  PreviewProfileRouteParams,
} from "../../types/preview.types";

const isSameUserData = (
  scannedData: Record<string, string> | null,
  currentUser: Record<string, string> | null,
) => {
  if (!scannedData || !currentUser) return false;

  return (
    scannedData.name === currentUser.name &&
    scannedData.gender === currentUser.gender &&
    scannedData.profession === currentUser.profession &&
    scannedData.bio === currentUser.bio &&
    scannedData.email === currentUser.email &&
    scannedData.phone === currentUser.phone &&
    scannedData.whatsapp === currentUser.whatsapp &&
    scannedData.linkOneTitle === currentUser.linkOneTitle &&
    scannedData.linkOneUrl === currentUser.linkOneUrl &&
    scannedData.linkTwoTitle === currentUser.linkTwoTitle &&
    scannedData.linkTwoUrl === currentUser.linkTwoUrl &&
    scannedData.linkThreeTitle === currentUser.linkThreeTitle &&
    scannedData.linkThreeUrl === currentUser.linkThreeUrl &&
    scannedData.linkFourTitle === currentUser.linkFourTitle &&
    scannedData.linkFourUrl === currentUser.linkFourUrl &&
    scannedData.linkFiveTitle === currentUser.linkFiveTitle &&
    scannedData.linkFiveUrl === currentUser.linkFiveUrl
  );
};

export async function resolvePreviewProfileSource(
  params: PreviewProfileRouteParams,
): Promise<PreviewProfileResult> {
  const { result, contactId } = params ?? {};

  if (typeof contactId === "string") {
    const contacts = getAllContacts() ?? [];
    const existingContact = contacts.find((c) => c.id === contactId);

    return {
      contact: existingContact ?? null,
      isScannedFlow: false,
      isExistingContactFlow: true,
      isOwnProfileFlow: false,
    };
  }

  if (typeof result === "string") {
    const scannedData = await decodeUserQRPayload(result);
    const currentUser = getUser();
    const isOwnProfileFlow = isSameUserData(scannedData, currentUser);

    return {
      contact: scannedData ?? null,
      isScannedFlow: true,
      isExistingContactFlow: false,
      isOwnProfileFlow,
    };
  }

  return {
    contact: null,
    isScannedFlow: false,
    isExistingContactFlow: false,
    isOwnProfileFlow: false,
  };
}
