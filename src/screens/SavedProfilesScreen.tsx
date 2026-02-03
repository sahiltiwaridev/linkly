import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getContactsStorage } from "../lib/storage/contacs.storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedProfilesScreen() {
  const [allContacts, setAllContacts] = useState<any | null>(null);

  useEffect(() => {
    const getContactsDetails = () => {
      const contacts = getContactsStorage();
      return setAllContacts(contacts);
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>
          {allContacts === null
            ? "You don't have any contacts right now."
            : allContacts}
        </Text>
      </View>
    </SafeAreaView>
  );
}
