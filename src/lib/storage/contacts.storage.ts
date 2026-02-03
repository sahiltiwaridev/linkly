import { getStorage } from "./mmkv";
import {
  deserializeContactsData,
  serializeContactsData,
} from "./storage.utils";
import { STORAGE_KEYS } from "./storageKeys";
import { UserData } from "./user.storage";

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
  const contactsArray = getContactsStorage();

  contactsArray.push(param);

  storage.set(
    STORAGE_KEYS.SAVED_CONTACTS,
    serializeContactsData(contactsArray)
  );
};

