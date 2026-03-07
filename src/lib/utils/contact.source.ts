import { decodeUserQRPayload } from "../qr/qr.parser";
import { getAllContacts } from "../storage/contacts.storage";
import {
  PreviewProfileResult,
  PreviewProfileRouteParams,
} from "../../types/preview.types";

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
    };
  }

  if (typeof result === "string") {
    const scannedData = await decodeUserQRPayload(result);

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
