import { generateUniqueId } from "../utils/id.utils";
import { getStorage } from "./mmkv";
import {
  deserializeContactsData,
  serializeContactsData,
} from "./storage.utils";
import { STORAGE_KEYS } from "./storageKeys";
import { Contact, UserData } from "./user.storage";

export const createContactsStorage = () => {
  const storage = getStorage();
  const contactsContainer: any = [];

  storage.set(
    STORAGE_KEYS.SAVED_CONTACTS,
    serializeContactsData(contactsContainer),
  );
};

export const getContactsStorage = () => {
  const storage = getStorage();
  const data = storage.getString(STORAGE_KEYS.SAVED_CONTACTS);

  if (!data) {
    const empty: any[] = [];
    storage.set(STORAGE_KEYS.SAVED_CONTACTS, serializeContactsData(empty));
    return empty;
  }

  return deserializeContactsData(data);
};

export const saveContact = (param: UserData | null) => {
  if (!param) return;

  const storage = getStorage();

  const existingContacts: Contact[] = getContactsStorage() ?? [];

  const newContact: Contact = {
    ...param,
    id: generateUniqueId(),
  };

  const updatedContacts = [...existingContacts, newContact];

  storage.set(
    STORAGE_KEYS.SAVED_CONTACTS,
    serializeContactsData(updatedContacts),
  );
};
