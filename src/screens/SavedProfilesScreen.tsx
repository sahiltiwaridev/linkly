import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getContactsStorage } from "../lib/storage/contacts.storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedProfilesScreen() {
  const [allContacts, setAllContacts] = useState<any[]>([]);

  useEffect(() => {
    const contacts = getContactsStorage();
    setAllContacts(contacts ?? []);
  }, []);

  const firstContact = allContacts.length > 0 ? allContacts[0] : null; // For testing

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>
          {firstContact
            ? firstContact.name
            : "You don't have any contacts right now."}
        </Text>
      </View>
    </SafeAreaView>
  );
}
