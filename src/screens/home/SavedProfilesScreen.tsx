import { View, Text, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { getAllContacts } from "../../lib/storage/contacts.storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SavedContactItem from "../../components/layout/SavedContactItem";
import Header from "../../components/layout/Header";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import ScanIcon from "../../assets/icons/qr-scan.svg";
import { Contact } from "../../types/user.types";

export default function SavedProfilesScreen() {
  const navigation = useNavigation<any>();
  const [allContacts, setAllContacts] = useState<Contact[]>([]);

  useFocusEffect(
    useCallback(() => {
      const contacts = getAllContacts();
      setAllContacts(contacts ?? []);
    }, []),
  );

  return (
    <View className="flex-1 p-5">
      <Header currentScreenName={"Saved Contacts"} />

      <FlatList
        data={allContacts}
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
        }}
        keyExtractor={(item, index) => item.id ?? `contact-${index}`}
        renderItem={({ item }) => (
          <SavedContactItem
            itemName={item.name}
            itemID={item.id}
            itemProfession={item.profession}
          />
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-20">
            <Text className="font-bold text-white text-2xl text-center mb-2">
              No saved contacts yet
            </Text>
            <Text className="text-[#B3B3B3] text-lg text-center mb-6">
              Scan a Linkly QR to add one
            </Text>
            <View className="w-full bottom-0 absolute">
              <PrimaryButton
                onPress={() => navigation.navigate("ScanQRScreen")}
                text="Scan QR"
                icon={ScanIcon}
              />
            </View>
          </View>
        }
      />
    </View>
  );
}
