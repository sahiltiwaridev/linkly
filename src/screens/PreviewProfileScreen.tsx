import { View, Text, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addContact, deleteContact } from "../lib/storage/contacts.storage";
import { resolvePreviewProfileSource } from "../lib/utils/contactResolver";

export default function PreviewProfileScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { contact, isScannedFlow, isExistingContactFlow } =
    resolvePreviewProfileSource(route.params);

  if (!contact) {
    return (
      <SafeAreaView>
        <Text>Contact not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Name: {contact.name}</Text>
        <Text>Gender: {contact.gender}</Text>
        <Text>Profession: {contact.profession}</Text>
        <Text>Email: {contact.email}</Text>
        <Text>Bio: {contact.bio}</Text>
      </View>

      <View>
        {isScannedFlow && (
          <Pressable
            onPress={() => {
              addContact(contact);
              navigation.replace("SavedProfilesScreen");
            }}
          >
            <Text>Save Contact</Text>
          </Pressable>
        )}

        {isExistingContactFlow && (
          <Pressable
            onPress={() => {
              deleteContact(contact);
              navigation.goBack();
            }}
          >
            <Text>Delete Contact</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
