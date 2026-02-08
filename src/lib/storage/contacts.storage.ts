import { generateUniqueId } from "../utils/id.utils";
import { getStorage } from "./storage.mmkv";
import {
  deserializeContactsData,
  serializeContactsData,
} from "./storage.utils";
import { STORAGE_KEYS } from "./storage.keys";
import { Contact, UserData } from "./user.storage";

export const initializeContactsStorage = () => {
  const storage = getStorage();
  const contactsContainer: any = [];

  storage.set(
    STORAGE_KEYS.SAVED_CONTACTS,
    serializeContactsData(contactsContainer),
  );
};

export const getAllContacts = () => {
  const storage = getStorage();
  const data = storage.getString(STORAGE_KEYS.SAVED_CONTACTS);

  if (!data) {
    const empty: any[] = [];
    storage.set(STORAGE_KEYS.SAVED_CONTACTS, serializeContactsData(empty));
    return empty;
  }

  return deserializeContactsData(data);
};

export const addContact = (param: UserData | null) => {
  if (!param) return;

  const storage = getStorage();

  const existingContacts: Contact[] = getAllContacts() ?? [];

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

export const deleteContact = (param: Contact | null) => {
  if (!param) return;

  const storage = getStorage();
  const existingContacts: Contact[] = getAllContacts() ?? [];

  const updatedContacts = existingContacts.filter((contact) => {
    if (param.id && contact.id) {
      return contact.id !== param.id;
    }

    return JSON.stringify(contact) !== JSON.stringify(param);
  });

  storage.set(
    STORAGE_KEYS.SAVED_CONTACTS,
    serializeContactsData(updatedContacts),
  );
};
