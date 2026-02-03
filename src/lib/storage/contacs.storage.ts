import { getStorage } from "./mmkv";
import {
  deserializeContactsData,
  serializeContactsData,
} from "./storage.utils";
import { STORAGE_KEYS } from "./storageKeys";

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
  const allContacts = storage.getString(STORAGE_KEYS.SAVED_CONTACTS);
  return deserializeContactsData(allContacts);
};
