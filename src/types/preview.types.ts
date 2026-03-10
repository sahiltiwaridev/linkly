import { Contact, UserData } from "./user.types";

export type PreviewProfileRouteParams = {
  result?: string;
  contactId?: string;
} | undefined;

export type PreviewContact = Contact | UserData;

export type PreviewProfileResult = {
  contact: PreviewContact | null;
  isScannedFlow: boolean;
  isExistingContactFlow: boolean;
};
