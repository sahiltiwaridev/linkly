import { parseScannedUserQRPayload } from "../qr/qrParser";
import { getContactsStorage } from "../storage/contacts.storage";

export type PreviewProfileResult = {
  contact: any | null;
  isScannedFlow: boolean;
  isExistingContactFlow: boolean;
};

export function resolvePreviewProfile(params: any): PreviewProfileResult {
  const { result, contactId } = params ?? {};

  if (typeof contactId === "string") {
    const contacts = getContactsStorage() ?? [];
    const existingContact = contacts.find((c: any) => c.id === contactId);

    return {
      contact: existingContact ?? null,
      isScannedFlow: false,
      isExistingContactFlow: true,
    };
  }

  if (typeof result === "string") {
    const scannedData = parseScannedUserQRPayload(result);

    return {
      contact: scannedData ?? null,
      isScannedFlow: true,
      isExistingContactFlow: false,
    };
  }

  return {
    contact: null,
    isScannedFlow: false,
    isExistingContactFlow: false,
  };
}
