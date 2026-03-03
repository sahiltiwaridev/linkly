import { View, Text, FlatList, Pressable } from "react-native";
import React, { useCallback, useState } from "react";
import { getAllContacts } from "../../lib/storage/contacts.storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function SavedProfilesScreen() {
  const navigation = useNavigation<any>();
  const [allContacts, setAllContacts] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const contacts = getAllContacts();
      setAllContacts(contacts ?? []);
    }, []),
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={allContacts}
        keyExtractor={(item, index) => item.id ?? `contact-${index}`}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>

            <Pressable
              onPress={() =>
                navigation.navigate("PreviewProfileScreen", {
                  contactId: item.id,
                })
              }
            >
              <Text>View</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text>You don't have any contacts right now.</Text>}
      />
    </View>
  );
}
