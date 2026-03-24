import { View, Text, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { getAllContacts } from "../../lib/storage/contacts.storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SavedContactItem from "../../components/layout/SavedContactItem";
import Header from "../../components/layout/Header";
import { Contact } from "../../types/user.types";
import NoSavedContact from "../../components/layout/EmptyContactsState";

export default function SavedProfilesScreen() {
  const [allContacts, setAllContacts] = useState<Contact[]>([]);

  useFocusEffect(
    useCallback(() => {
      const contacts = getAllContacts();
      setAllContacts(contacts ?? []);
    }, []),
  );

  return (
    <View className="flex-1 p-5">
      <View className="w-full pb-14">
        <Header currentScreenName={"Saved Contacts"} />
      </View>

      <FlatList
        data={allContacts}
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyExtractor={(item, index) => item.id ?? `contact-${index}`}
        renderItem={({ item }) => (
          <SavedContactItem
            itemName={item.name}
            itemID={item.id}
            itemProfession={item.profession}
          />
        )}
        ListEmptyComponent={<NoSavedContact />}
      />
    </View>
  );
}
