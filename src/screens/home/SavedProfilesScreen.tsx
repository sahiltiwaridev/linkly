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

  if (allContacts.length === 0) {
    return (
      <View className="items-center mt-20 gap-2">
        <Text className="text-[#B3B3B3] text-lg">No saved contacts yet</Text>
        <Text className="text-[#777] text-sm">Scan a Linkly QR to add one</Text>
      </View>
    );
  }

  return (
    <View className="p-5">
      <Header currentScreenName={"Saved Contacs"} />

      <FlatList
        data={allContacts}
        keyExtractor={(item, index) => item.id ?? `contact-${index}`}
        renderItem={({ item }) => (
          <SavedContactItem itemName={item.name} itemID={item.id} itemProfession={item.profession}/>
          // <View>
          //   <Text>{item.name}</Text>

          //   <Pressable
          //     onPress={() =>
          //       navigation.navigate("PreviewProfileScreen", {
          //         contactId: item.id,
          //       })
          //     }
          //   >
          //     <Text>View</Text>
          //   </Pressable>
          // </View>
        )}
        ListEmptyComponent={
          <>
            <Text className="pt-80 self-center text-white text-2xl">
              No saved contacts yet
            </Text>
            <Text className="pb-92 self-center text-[#B3B3B3] text-lg">
              Scan a Linkly QR to add one
            </Text>
            <PrimaryButton
              onPress={() => navigation.navigate("ScanQRScreen")}
              text="Scan QR"
              icon={ScanIcon}
            />
          </>
        }
      />
    </View>
  );
}
